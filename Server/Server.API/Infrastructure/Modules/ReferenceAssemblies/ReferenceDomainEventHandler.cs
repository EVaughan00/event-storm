using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;
using BuildingBlocks.Events;

namespace Server.API.DomainEvents
{
    public class ReferenceDomainEvent : DomainEvent { }

    public class ReferenceDomainEventHandler : DomainEventHandler<ReferenceDomainEvent>
    {

        public ReferenceDomainEventHandler(EventTracker eventTracker) : base(eventTracker){ }

        public override async Task HandleEvent(ReferenceDomainEvent domainEvent, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
        }
    }
}