using System.Threading;
using System.Threading.Tasks;
using BuildingBlocks.Events;
using Server.Domain;
using Microsoft.Extensions.Logging;

namespace Server.API.Commands
{
    using Models;

    public class RequestPasswordResetCommand : Command<ResetCode> 
    { 
        public PasswordResetRequest Request { get; set; }
    }
    
    public class RequestPasswordResetCommandHandler : CommandHandler<RequestPasswordResetCommand, ResetCode> 
    {
        private readonly ILogger<RequestPasswordResetCommandHandler> _logger;
        private readonly IPasswordResetRepository _passwordResets;
        private readonly IUserRepository _users;

        public RequestPasswordResetCommandHandler(
            ILogger<RequestPasswordResetCommandHandler> logger,
            IPasswordResetRepository passwordResets,
            IUserRepository users)
        {
            _logger = logger;
            _passwordResets = passwordResets;
            _users = users;
        }

        public override async Task<ResetCode> HandleEvent(RequestPasswordResetCommand command, CancellationToken token)
        {
            PasswordReset passwordReset = null;

            var user = await _users.GetByEmail(command.Request.Email);

            try {
                passwordReset = new PasswordReset(user.Id);
                await _passwordResets.Create(passwordReset);          
            } catch {
                passwordReset = await _passwordResets.GetOne(user);
                passwordReset.Refresh();

                await _passwordResets.Update(passwordReset);
                _logger.LogInformation($"Password reset completed for [{command.Request.Email}]");
            }      
            
            return passwordReset.ResetCode;    
        }

    }    
}