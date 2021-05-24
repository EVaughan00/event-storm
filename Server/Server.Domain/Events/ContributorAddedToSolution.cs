using BuildingBlocks.Events;
using MongoDB.Bson;

namespace Server.Domain
{
    public class ContributorAddedToSolution : DomainEvent
    {
        public ObjectId SolutionId { get; set; }  
        public ObjectId UserId { get; set; }              
    }
}