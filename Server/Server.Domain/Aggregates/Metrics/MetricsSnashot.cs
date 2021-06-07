using BuildingBlocks.SeedWork;

namespace Server.Domain
{
    public class MetricsSnapshot : Entity, IAggregateRoot
    {
        public EventStormMetrics EventStorm { get; private set; }
        public ModelRepositoryMetrics ModelRepository { get; private set; }       
        public TaskStackMetrics TaskStack { get; private set; }   
        public CollaboratorsMetrics Collaborators { get; private set; }  
    }
}