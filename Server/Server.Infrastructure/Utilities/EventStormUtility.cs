using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using Server.Domain;

namespace Server.Infrastructure.Utilities
{
    public class EventStorm {
        public List<EventBlock> Blocks {get; set;}
        public List<EventEdge> Edges {get; set;}
    }

    public class EventStormUtility : IEventStormUtility
    {
        private readonly IEventBlockRepository _eventBlocks;
        private readonly IEventEdgeRepository _eventEdges;

        public EventStormUtility(
            IEventBlockRepository eventBlocks,
            IEventEdgeRepository eventEdges
        ) {
            _eventBlocks = eventBlocks;
            _eventEdges = eventEdges;
        }

        public async Task<EventStorm> BuildEventStorm(string solutionId) {

            var eventStorm = new EventStorm();

            eventStorm.Blocks = await _eventBlocks.GetAllBySolutionId(solutionId);
            eventStorm.Edges = await _eventEdges.GetAllBySolutionId(solutionId);

            return eventStorm;
        }
    }
}