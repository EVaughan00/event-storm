using BuildingBlocks.SeedWork;
using System;

namespace Server.Domain
{

    public class SessionStatus : Enumeration
    {
        public static SessionStatus Active = new SessionStatus(1, "Active");
        public static SessionStatus Expired = new SessionStatus(2, "Expired");

        public DateTime ChangedAt = DateTime.Now;        

        public SessionStatus(int id, string name) : base(id, name) {}
    }    
}