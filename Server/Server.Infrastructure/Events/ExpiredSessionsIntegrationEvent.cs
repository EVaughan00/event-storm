using BuildingBlocks.Events;
using System.Collections.Generic;

namespace Server.Infrastructure.Events
{
    public class ExpiredSessionClaim {
        public string SessionId { get; set; }
        public string UserId { get; set; }
        public string Email { get; set; }
    }

    public class ExpiredSessionsIntegrationEvent : IntegrationEvent
    {
        public ExpiredSessionsIntegrationEvent()
        {
            Expirations = new List<ExpiredSessionClaim>();
        }

        public List<ExpiredSessionClaim> Expirations { get; set; }
    }    
}