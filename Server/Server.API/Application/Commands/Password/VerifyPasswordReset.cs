using System.Threading;
using System.Threading.Tasks;
using BuildingBlocks.Events;
using Server.Domain;
using Microsoft.Extensions.Logging;
using MediatR;

namespace Server.API.Commands
{
    using Models;

    public class VerifyPasswordResetCommand : Command<bool> 
    { 
        public PasswordResetCode Reset { get; set; }
    }
    
    public class VerifyPasswordResetCommandHandler : CommandHandler<VerifyPasswordResetCommand, bool> 
    {
        private readonly ILogger<VerifyPasswordResetCommandHandler> _logger;
        private readonly IMediator _mediator;
        private readonly IPasswordResetRepository _passwordResets;
        private readonly ISessionRepository _sessions;
        private readonly IUserRepository _users;

        public VerifyPasswordResetCommandHandler(
            ILogger<VerifyPasswordResetCommandHandler> logger,
            IMediator mediator,
            IPasswordResetRepository passwordResets,
            ISessionRepository sessions,
            IUserRepository users)
        {
            _logger = logger;
            _mediator = mediator;
            _passwordResets = passwordResets;
            _sessions = sessions;
            _users = users;
        }

        public override async Task<bool> HandleEvent(VerifyPasswordResetCommand command, CancellationToken token)
        {

            try {
                var passwordReset = await _passwordResets.GetOne(command.Reset.ResetCode);
                var user = await _users.GetById(passwordReset.UserId.ToString());
                await _passwordResets.Remove(passwordReset);
            
                return await _mediator.Send(new AuthenticateUserCommand {
                    Authenticated = true,
                    User = user
                }, token);
            } catch {
                throw new System.Exception($"Could not verify password reset: \"{command.Reset.ResetCode}\""); 
            }
        }

    }    
}