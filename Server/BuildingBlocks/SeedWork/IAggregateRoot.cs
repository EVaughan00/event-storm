namespace BuildingBlocks.SeedWork
{
    // Marker interface
    public interface IAggregateRoot { }
    
    public abstract class AggregateRoot : Entity, IAggregateRoot {}

}