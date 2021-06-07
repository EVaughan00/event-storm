using System.Collections.Generic;

namespace Server.Domain
{
    public class EventStormMetrics
    {
        public Count TotalEventBlocks { get; private set; }
        public Count CompletedEventBlocks { get; private set; }
    }
}