using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Server.Domain
{
    public class Solution : Entity, IAggregateRoot
    {
        [BsonElement("Name")]
        public string Name { get; private set; }

        [BsonElement("OwnerId")]
        public ObjectId OwnerId { get; private set; }

        [BsonElement("Description")]
        public SolutionDescription Description { get; private set; }

        [BsonElement("TempatedAs")]
        public List<TemplateId> TempatedAs { get; private set; }

        [BsonElement("FromTemplate")]
        public TemplateId FromTemplateId { get; private set; }

        [BsonElement("Tools")]
        public Tools Tools { get; private set; }

        [BsonElement("MetricsId")]
        public ObjectId MetricsId { get; private set; }

        public Solution(string name) {
            Name = name;
        }
        public void UseTools(Tools tools) {
            Tools = tools;
        }

        public void AddOwner(User user) {
            if (OwnerId != new ObjectId())
                throw new ServerDomainException("Solution owner already exists");

            OwnerId = user.Id;
        }

        public void Describe(SolutionDescription description) {
            Description = description;
        }

        public void FromTemplate(Template template)
        {
            FromTemplateId = new TemplateId(template.Id);

            Name = template.Name; 
        }
    }

    public class SolutionId : ValueObject
    {
        private ObjectId _value;

        public SolutionId(ObjectId value) {
            _value = value;
        }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return _value;
        }
    }
}