using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using Server.Domain;

namespace Server.Domain
{
    public class EventEdge : Entity, IAggregateRoot
    {
        public ObjectId SolutionId { get; set; }
        public Coordinate Source { get; set; }
        public Coordinate Destination { get; set; }
    }
}