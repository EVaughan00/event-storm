using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Server.Domain
{
    public class Template : Entity, IAggregateRoot
    {
        [BsonElement("Name")]
        public string Name { get; private set; }
        [BsonElement("Description")]
        public TemplateDescription  Description { get; private set; }
        [BsonElement("FromSolutionId")]
        public ObjectId FromSolutionId { get; private set; }
        public Template(string name) {
            Name = name;
        }

        public void FromSolution(Solution solution) {
            Name = solution.Name;

            FromSolutionId = solution.Id;
        }
    }
}