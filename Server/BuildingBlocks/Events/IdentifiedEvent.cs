using System;
using Newtonsoft.Json;
using System.Threading;
using System.Threading.Tasks;

namespace BuildingBlocks.Events
{
    public abstract class IdentifiedEvent
    {
        public IdentifiedEvent()
        {
            EventId = Guid.NewGuid();
            CreationDate = DateTime.UtcNow;
        }

        [JsonConstructor]
        public IdentifiedEvent(Guid id, DateTime createDate)
        {
            EventId = id;
            CreationDate = createDate;
        }

        [JsonProperty]
        public Guid EventId { get; set; }

        [JsonProperty]
        public DateTime CreationDate { get; set; }

        public string GetName()
        {
            return this.GetType().Name;
        }
    }
    public abstract class IdemponentEventHandler<T> where T: IdentifiedEvent
    {
        private EventTracker _eventTracker;

        public IdemponentEventHandler(EventTracker eventTracker)
        {
            _eventTracker = eventTracker;
        }

        public IdemponentEventHandler() { }

        public void AddEventTracking(EventTracker eventTracker) 
        {
            _eventTracker = eventTracker;
        }

        protected void TrackEvent(T uniqueEvent) 
        {
            if (_eventTracker == null)
                return;

            var eventType = uniqueEvent.GetType().Name;
            
            if (_eventTracker.Exists(uniqueEvent))
                throw new Exception($"{eventType} with event-id({uniqueEvent.EventId}) already exists");

            _eventTracker.Add(uniqueEvent);
        }
    }
    

    public abstract class IdentifiedEventHandler<T> : IdemponentEventHandler<T> where T: IdentifiedEvent
    {
        public IdentifiedEventHandler() {}
        public IdentifiedEventHandler(EventTracker eventTracker): base(eventTracker) {}

        public async Task Handle(T uniqueEvent, CancellationToken cancellationToken)
        {
            TrackEvent(uniqueEvent);
            await HandleEvent(uniqueEvent, cancellationToken);
        }

        public abstract Task HandleEvent(T uniqueEvent, CancellationToken cancellationToken);        
    }

    public abstract class IdentifiedResponseHandler<T, R> : IdemponentEventHandler<T> where T: IdentifiedEvent
    {
        public IdentifiedResponseHandler() {}
        public IdentifiedResponseHandler(EventTracker eventTracker): base(eventTracker) {}

        public async Task<R> Handle(T uniqueEvent, CancellationToken cancellationToken)
        {
            TrackEvent(uniqueEvent);
            return await HandleEvent(uniqueEvent, cancellationToken);
        }

        public abstract Task<R> HandleEvent(T uniqueEvent, CancellationToken cancellationToken);        
    }
}