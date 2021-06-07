using MediatR;
using Server.Domain;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;
using BuildingBlocks.Events;

namespace Server.API.DomainEvents
{
    using System;
    using Commands;
    public class ContributorAddedToSolutionDomainEventHandler : DomainEventHandler<ContributorAddedToSolution>
    {
        private readonly ILogger<ContributorAddedToSolutionDomainEventHandler> _logger;
        private readonly IMediator _mediator;
        private readonly ISolutionRepository _solutions;
        private readonly IUserRepository _users;

        public ContributorAddedToSolutionDomainEventHandler(
            EventTracker eventTracker, 
            ILogger<ContributorAddedToSolutionDomainEventHandler> logger,            
            IMediator mediator,
            ISolutionRepository solutions,
            IUserRepository users) 
        {
            _logger = logger;
            _mediator = mediator;
            _solutions = solutions;
            _users = users;
            AddEventTracking(eventTracker);
        }
 
        public override async Task HandleEvent(
            ContributorAddedToSolution @event, 
            CancellationToken cancellationToken) 
        {   
            try {
                var solution = await _solutions.GetById(@event.SolutionId.ToString());
                var user = await _users.GetById(@event.UserId.ToString());

                // TODO: Send contributor request to user
                user.AddSolution(solution);

                await _users.Update(user);
            } catch(Exception e) {
                throw e;
            }

        }
    }
}