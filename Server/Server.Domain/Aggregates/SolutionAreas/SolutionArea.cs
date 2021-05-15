using System;
using BuildingBlocks.SeedWork;
using MongoDB.Bson.Serialization.Attributes;

namespace Server.Domain
{
    public class SolutionArea : Entity, IAggregateRoot
    {
        [BsonElement("Reference")]
        public Guid Reference { get; private set; }

        public SolutionArea() {
            Reference = Guid.NewGuid();
        }   

    }
}