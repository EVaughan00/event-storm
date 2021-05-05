using BuildingBlocks.Events;

namespace Server.Domain
{
    public class UpdateSessionClaims : DomainEvent
    {
        public User User { get; set; }        
    }
}