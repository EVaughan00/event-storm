using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using Server.Domain;

namespace Server.Domain
{
    public class EventBlock : Entity, IAggregateRoot
    {
        public ObjectId SolutionId { get; set; }
        public Coordinate Coordinate { get; set; }
        
    }
}