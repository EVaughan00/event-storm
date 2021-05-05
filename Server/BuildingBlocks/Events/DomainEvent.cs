using MediatR;

namespace BuildingBlocks.Events
{       
    public abstract class DomainEvent : 
        IdentifiedEvent, INotification {}

    public abstract class DomainEventHandler<T> : 
        IdentifiedEventHandler<T>, 
        INotificationHandler<T> 
        where T: DomainEvent
    {
        public DomainEventHandler(EventTracker eventTracker) 
            : base(eventTracker) { }
        
        public DomainEventHandler() {}        
    }
}