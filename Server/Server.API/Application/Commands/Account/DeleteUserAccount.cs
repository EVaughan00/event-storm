using System.Threading;
using System.Threading.Tasks;
using BuildingBlocks.Events;
using Server.Domain;
using Microsoft.Extensions.Logging;
using MassTransit;

namespace Server.API.Commands
{
    
    public class DeleteUserAccountCommand : Command<bool> 
    { 
        public string Email { get; set; }
    }
    
    public class DeleteUserAccountCommandHandler : CommandHandler<DeleteUserAccountCommand, bool> 
    {
        private readonly ILogger<DeleteUserAccountCommandHandler> _logger;
        private readonly MediatR.IMediator _mediator;
        private readonly IBusControl _eventBus;
        private readonly IUserRepository _users;
        private readonly ISessionRepository _sessions;

        public DeleteUserAccountCommandHandler(
            ILogger<DeleteUserAccountCommandHandler> logger,
            MediatR.IMediator mediator,
            IBusControl eventBus,
            ISessionRepository sessions,
            IUserRepository users)
        {
            _logger = logger;
            _eventBus = eventBus;
            _mediator = mediator;
            _sessions = sessions;
            _users = users;
        }

        public override async Task<bool> HandleEvent(DeleteUserAccountCommand command, CancellationToken token)
        {
            var user = await _users.GetByEmail(command.Email);
            
            try {
                await _users.Delete(user.Email.Address);
                await _sessions.Clear(user);
            } catch {
                // No action necessary
            }

            _logger.LogInformation($"Deleted user [{command.Email}]");
            
            return await _mediator.Send(new AuthenticateUserCommand {
                Authenticated = false,
                User = user
            }, token);
        }

    }    
}