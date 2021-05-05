using System.Threading;
using System.Threading.Tasks;
using BuildingBlocks.Events;
using Server.Domain;
using Microsoft.Extensions.Logging;
using System;
using Server.Infrastructure;

namespace Server.API.Commands
{
    using Models;

    public class UpdateUserPasswordCommand : Command<bool> 
    { 
        public string Email { get; set; }
        
        public PasswordUpdate Update { get; set; }
    }
    
    public class UpdateUserPasswordCommandHandler : CommandHandler<UpdateUserPasswordCommand, bool> 
    {
        private readonly ILogger<UpdateUserPasswordCommandHandler> _logger;
        private readonly IUserRepository _users;

        public UpdateUserPasswordCommandHandler(
            ILogger<UpdateUserPasswordCommandHandler> logger,
            IUserRepository users)
        {
            _logger = logger;
            _users = users;
        }

        public override async Task<bool> HandleEvent(UpdateUserPasswordCommand command, CancellationToken token)
        {
            var user = await _users.GetByEmail(command.Email);
            var updatedUser = user.Copy();           

            try {
                updatedUser.SetPassword(command.Update.Password, new PasswordRequirements {
                    MinLength = 8,
                    Uppercase = true,
                    Lowercase = true,
                    Numeric = true
                });
            } catch (Exception ex) {
                throw new ApiException(ex.Message).AddError("password", ex.Message);
            }

            await _users.Update(updatedUser);              

            return true;    
        }

    }    
}