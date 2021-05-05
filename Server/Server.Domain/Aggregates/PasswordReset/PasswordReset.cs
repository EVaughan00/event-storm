using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using BuildingBlocks.SeedWork;
using System;

namespace Server.Domain
{
    public class PasswordReset : Entity, IAggregateRoot
    {
        [BsonElement("UserId")]
        public ObjectId UserId { get; private set; }

        [BsonElement("ResetCode")]
        public ResetCode ResetCode { get; private set; }

        [BsonElement("Expiry")]
        public DateTime Expiry { get; private set; }

        public static int CodeLength = 10;
        public static TimeSpan TimeSpan = TimeSpan.FromHours(2);

        public PasswordReset(ObjectId userId)
        {
            UserId = userId;
            ResetCode = new ResetCode(CodeLength);
            Expiry = DateTime.Now.Add(TimeSpan);
        }

        public void Refresh()
        {
            ResetCode.GenerateCode(CodeLength);
            Expiry = DateTime.Now.Add(TimeSpan);
        }

        public bool IsExpired()
        {
            return DateTime.Compare(Expiry, DateTime.Now) <= 0;
        }
    }
}