using System.Collections.Generic;
using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Server.Domain
{
    public class Tool : Entity, IAggregateRoot
    {
        [BsonElement("Active")]
        public bool Active { get; private set; }

        public Tool() {}

        public void SetAsActive(bool active) {
            Active = active;
        }
    }

    public interface ISelectableTools {
        bool EventStorm {get; set;}
        bool ModelRepository {get; set;}
        bool TaskStack {get; set;}
    }
}