using System.Threading;
using System.Threading.Tasks;
using BuildingBlocks.Events;
using Server.Domain;
using Microsoft.Extensions.Logging;
using MediatR;
using Server.Infrastructure;

namespace Server.API.Commands
{
    using Models;

    public class LoginUserCommand : Command<bool> 
    { 
        public Login Login { get; set; }
    }
    
    public class LoginUserCommandHandler : CommandHandler<LoginUserCommand, bool> 
    {
        private readonly ILogger<LoginUserCommandHandler> _logger;
        private readonly IMediator _mediator;
        private readonly IUserRepository _users;

        public LoginUserCommandHandler(
            ILogger<LoginUserCommandHandler> logger,
            IMediator mediator,
            IUserRepository users)
        {
            _logger = logger;
            _mediator = mediator;
            _users = users;
        }

        public override async Task<bool> HandleEvent(LoginUserCommand command, CancellationToken token)
        {
            var user = await _users.GetByEmail(command.Login.Email);

            if (!user.Password.Equals(command.Login.Password)){
                _logger.LogInformation($"Log in failed: Incorrect password");

                throw new ApiException()
                    .AddError("password", "The password is incorrect. Try again");
            }
            
            _logger.LogInformation($"Successfully logged in user [{command.Login.Email}]");

            return await _mediator.Send(new AuthenticateUserCommand {
                Authenticated = true,
                User = user,
                Remember = command.Login.Remember
            }, token);
        }

    }    
}