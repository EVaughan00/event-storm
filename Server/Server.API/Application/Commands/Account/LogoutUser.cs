using System.Threading;
using System.Threading.Tasks;
using BuildingBlocks.Events;
using Server.Domain;
using Microsoft.Extensions.Logging;
using MediatR;

namespace Server.API.Commands
{
    public class LogoutUserCommand : Command<bool> 
    { 
        public string Email { get; set; }        
    }
    
    public class LogoutUserCommandHandler : CommandHandler<LogoutUserCommand, bool> 
    {
        private readonly ILogger<LogoutUserCommandHandler> _logger;
        private readonly IMediator _mediator;
        private readonly IUserRepository _users;

        public LogoutUserCommandHandler(
            ILogger<LogoutUserCommandHandler> logger,
            IMediator mediator,
            IUserRepository users)
        {
            _logger = logger;
            _mediator = mediator;
            _users = users;
        }

        public override async Task<bool> HandleEvent(LogoutUserCommand command, CancellationToken token)
        {
            User user = null;

            try {
                user = await _users.GetByEmail(command.Email);
            } catch {}
            
            return await _mediator.Send(new AuthenticateUserCommand {
                Authenticated = false,
                User = user
            }, token);            
        }

    }    
}