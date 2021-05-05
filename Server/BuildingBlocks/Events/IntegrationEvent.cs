using System.Threading;
using System.Threading.Tasks;
using MassTransit;

namespace BuildingBlocks.Events
{
    
    public abstract class IntegrationEvent : IdentifiedEvent {}

    public abstract class IntegrationEventHandler<T> : IdentifiedEventHandler<T>, IConsumer<T> where T: IntegrationEvent
    {
        public IntegrationEventHandler(EventTracker eventTracker) 
            : base(eventTracker) { }
        
        public IntegrationEventHandler() {}

        public async Task Consume(ConsumeContext<T> context)
        {
            await base.Handle(context.Message, CancellationToken.None);
        }
    }
}