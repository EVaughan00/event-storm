using BuildingBlocks.SeedWork;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Server.Domain
{
    public class Session : Entity, IAggregateRoot
    {
        public static TimeSpan TimeSpan = TimeSpan.FromDays(2);
        
        [BsonElement("Claims")]
        public SessionClaims Claims { get; private set; }

        [BsonElement("Expiry")]
        public DateTime Expiry { get; private set; }

        [BsonElement("Status")]
        public SessionStatus Status { get; private set; }

        [BsonElement("Remember")]
        public bool Remember { get; set; }

        [BsonIgnore]
        public IEnumerable<string> Keys { 
            get {
                var keys = new List<string>();

                keys.AddRange(Values.Keys);

                return keys;
            }
        }

        [BsonElement("Values")]
        private Dictionary<string, string> Values { get; set; }

        public Session() 
        {
            Claims = new SessionClaims();
            Initialize();
        }

        public Session(User user)
        {
            Claims = new SessionClaims(user);
            Initialize();
        }

        private void Initialize()
        {
            Expiry = DateTime.Now.Add(TimeSpan);
            Values = new Dictionary<string, string>();
            Status = SessionStatus.Active;
            Remember = false;
        }

        public bool IsExpired() 
        {
            return DateTime.Compare(Expiry, DateTime.Now) <= 0;
        }

        public void RefreshExpiration() 
        {
            Expiry = DateTime.Now.Add(TimeSpan);
        }

        public string GetValue(string key)
        {
            string value;

            if (!Values.TryGetValue(key, out value))
                throw new ServerDomainException($"Session does not contain a string value for key: [{key}]");

            return value;
        }

        public void RemoveValue(string key)
        {
            Values.Remove(key);
        }

        public void SetValue(string key, string value)
        {
            Values.Add(key, value);
        }

        public void ChangeStatus(SessionStatus status) 
        {
            if (status == SessionStatus.Active &&
                Status != SessionStatus.Active) 
                RefreshExpiration();

            Status = status;
        } 
    }    
}