using BuildingBlocks.Events;

namespace Server.Domain
{
    public class ToolsSelectedFromToolbox : DomainEvent
    {
        public SolutionId SolutionId { get; set; }      
    }
}