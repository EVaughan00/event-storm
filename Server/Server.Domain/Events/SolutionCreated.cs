using BuildingBlocks.Events;

namespace Server.Domain
{
    public class SolutionCreated : DomainEvent
    {
        public SolutionId SolutionId { get; set; }        
    }
}