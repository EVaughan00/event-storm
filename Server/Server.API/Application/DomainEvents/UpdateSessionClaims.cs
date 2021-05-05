using MediatR;
using Server.Domain;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;
using BuildingBlocks.Events;

namespace Server.API.DomainEvents
{
    using Commands;
    public class UpdateSessionClaimsDomainEventHandler : DomainEventHandler<UpdateSessionClaims>
    {
        private readonly ILogger<UpdateSessionClaimsDomainEventHandler> _logger;
        private readonly IMediator _mediator;
        private readonly ISessionRepository _sessions;

        public UpdateSessionClaimsDomainEventHandler(
            EventTracker eventTracker, 
            ILogger<UpdateSessionClaimsDomainEventHandler> logger,            
            IMediator mediator,
            ISessionRepository sessions) 
        {
            _logger = logger;
            _mediator = mediator;
            _sessions = sessions;
            AddEventTracking(eventTracker);
        }

        public override async Task HandleEvent(
            UpdateSessionClaims @event, 
            CancellationToken cancellationToken) 
        {            
            try {
                var session = await _sessions.Retrieve(@event.User);
                session.Claims.Change(@event.User);    
                await _sessions.Update(session);
            } catch { }
            
            await _mediator.Send(new AuthenticateUserCommand {
                Authenticated = true,
                User = @event.User
            }, cancellationToken);

            _logger.LogInformation($"Updated user session claims to [{@event.User.Email}]...");
        }
    }
}