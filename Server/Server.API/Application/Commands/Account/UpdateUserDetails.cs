using System.Threading;
using System.Threading.Tasks;
using BuildingBlocks.Events;
using Server.Domain;
using Microsoft.Extensions.Logging;
using MassTransit;

namespace Server.API.Commands
{    
    using Models;

    public class UpdateUserDetailsCommand : Command<bool> 
    { 
        public string UserEmail { get; set; }
        public UserDetails Update { get; set; }
    }

    public class UpdateUserDetailsCommandHandler : CommandHandler<UpdateUserDetailsCommand, bool> 
    {
        private readonly ILogger<UpdateUserDetailsCommandHandler> _logger;
        private readonly IUserRepository _users;
        private readonly ISessionRepository _sessions;
        private readonly MediatR.IMediator _mediator;
        private readonly IBusControl _eventBus;

        public UpdateUserDetailsCommandHandler(
            ILogger<UpdateUserDetailsCommandHandler> logger,
            ISessionRepository sessionRepository,
            MediatR.IMediator mediator,
            IBusControl eventBus,
            IUserRepository userRepository)
        {
            _logger = logger;
            _eventBus = eventBus;
            _users = userRepository;
            _sessions = sessionRepository;
            _mediator = mediator;
        }

        public override async Task<bool> HandleEvent(UpdateUserDetailsCommand command, CancellationToken token)
        {
            var user = await _users.GetByEmail(command.UserEmail);
            var updatedUser = user.Copy();
            
            updatedUser.SetEmail(command.Update.Email);
            updatedUser.SetName(command.Update.FirstName, command.Update.LastName);
            await _users.Update(updatedUser);              

            _logger.LogInformation($"Successfully updated user [{command.UserEmail}]");        

            return true;
        }

    }    
}