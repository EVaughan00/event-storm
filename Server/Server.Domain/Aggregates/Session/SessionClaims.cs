using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using System.Collections.Generic;

namespace Server.Domain
{
    public class SessionClaims : ValueObject {
        public string Email;
        public ObjectId UserId;

        public SessionClaims() { }

        public SessionClaims(User user) 
        {
            Email = user.Email.Address;
            UserId = user.Id;
        }

        public bool Equals(User user)
        {
            return user.Email.Address == Email;
        }

        public void Change(User user)
        {
            Email = user.Email.Address;
            UserId = user.Id;
        }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Email;
            yield return UserId;
        }

    }
}