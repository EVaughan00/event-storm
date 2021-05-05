using System.Threading.Tasks;
using System.Threading;
using Microsoft.Extensions.Logging;
using BuildingBlocks.Events;
using Server.Infrastructure.Events;
using Server.Domain;
using MediatR;

namespace Server.API.IntegrationEvents
{
    using Commands;

    public class ExpiredSessionsIntegrationEventHandler : IntegrationEventHandler<ExpiredSessionsIntegrationEvent> {
        private ILogger<ExpiredSessionsIntegrationEventHandler> _logger;
        private readonly IMediator _mediator;
        private readonly IUserRepository _users;
        
        public ExpiredSessionsIntegrationEventHandler(
            EventTracker eventTracker, 
            IMediator mediator,
            ILogger<ExpiredSessionsIntegrationEventHandler> logger,           
            IUserRepository users) 
        {
            _logger = logger;
            _mediator = mediator;
            _users = users;
            AddEventTracking(eventTracker);
        }

        public override async Task HandleEvent(ExpiredSessionsIntegrationEvent eventMessage, CancellationToken token)
        {
            _logger.LogInformation($"Expired sessions: {eventMessage.Expirations.Count}");         

            eventMessage.Expirations.ForEach(async expiredSession => {
                var user = await _users.GetByEmail(expiredSession.Email);

                await _mediator.Send(new AuthenticateUserCommand {
                    Authenticated = false,
                    User = user
                }, token);     
            });            

            await Task.CompletedTask;
        }
    }

}