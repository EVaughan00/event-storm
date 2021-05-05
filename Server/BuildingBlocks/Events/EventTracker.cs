using System;
using System.Collections.Generic;

namespace BuildingBlocks.Events
{
    public class EventTracker 
    {
        private List<Guid> _eventIds;

        public EventTracker()
        {
            _eventIds = new List<Guid>();
        }

        public bool Exists(IdentifiedEvent e)
        {
            return _eventIds.Contains(e.EventId);
        }

        public void Add(IdentifiedEvent e)
        {
            if (Exists(e))
                return;

            _eventIds.Add(e.EventId);
        }

        public void Remove(IdentifiedEvent e)
        {
            if (Exists(e))
                return;

            _eventIds.Remove(e.EventId);
        }

    }    
}