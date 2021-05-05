using BuildingBlocks.Utils;
using BuildingBlocks.Events;
using Server.Domain;
using Server.Config;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MediatR;

namespace Server.API.Commands
{    
    using Notifications;

    public class AuthenticateUserCommand : Command<bool>
    { 
        public bool Authenticated { get; set; }
        public User User { get; set; }
        public bool Remember { get; set; }
    }

    public class AuthenticateUserCommandHandler : CommandHandler<AuthenticateUserCommand, bool> 
    {
        private readonly ILogger<AuthenticateUserCommandHandler> _logger;
        private readonly ISessionRepository _sessions;
        private readonly JwtTokenSettings _jwtSettings;
        private readonly IMediator _mediator;

        public AuthenticateUserCommandHandler(
            IMediator mediator,
            ILogger<AuthenticateUserCommandHandler> logger,
            ISessionRepository sessionRepository,
            IOptions<AppSettings> options)
        {
            _logger = logger;
            _mediator = mediator;
            _sessions = sessionRepository;
            _jwtSettings = options.Value.JwtToken;
        }

        public override async Task<bool> HandleEvent(AuthenticateUserCommand command, CancellationToken token)
        {
            var jwtToken = "";

            if (command.User == null) 
                return await NotifyUser(jwtToken, null);

            if (!command.Authenticated) {
                await _sessions.Clear(command.User);
                return await NotifyUser(jwtToken, command.User);
            }

            jwtToken = TryCreateToken(command.User, command.Authenticated);
        
            try {
               await _sessions.Start(command.User, command.Remember);
            } catch {
               await _sessions.Recover(command.User);
            }

            return await NotifyUser(jwtToken, command.User);
        }

        public async Task<bool> NotifyUser(string token, User user) {            
            await _mediator.Publish(new SessionUpdatedNotification {
                SessionToken = token,
            });

            return token != "";
        }

        public string TryCreateToken(User user, bool authenticated)
        {
            var token = "";

            try {
                token = JsonWebTokenUtils.GenerateToken($"{user.Email}", $"{user.Id}", _jwtSettings);
            } catch {}

            return token;
        }

    }    
}