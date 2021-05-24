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

        [BsonElement("TempatedAsIds")]
        public List<ObjectId> TempatedAsIds { get; private set; }

        [BsonElement("FromTemplateId")]
        public ObjectId FromTemplateId { get; private set; }

        [BsonElement("Tools")]
        public Tools Tools { get; private set; }

        [BsonElement("MetricsId")]
        public ObjectId MetricsId { get; private set; }

        [BsonElement("ContributorIds")]
        public List<ObjectId> ContributorIds { get; private set; }

        public Solution(string name) {
            Name = name;

            ContributorIds = new List<ObjectId>();
        }
        public void UseTools(Tools tools) {
            Tools = tools;
        }

        public void AddOwner(User user) {
            if (OwnerId != new ObjectId())
                throw new ServerDomainException("Solution owner already exists");

            OwnerId = user.Id;

            AddContributor(user);
        }

        public void Describe(string description) {

            Description = new SolutionDescription(description);
            
            if (String.IsNullOrEmpty(description)) {
                Description.SetValue(Name);
            }
        }

        public void FromTemplate(Template template)
        {
            FromTemplateId = template.Id;

            Name = template.Name; 
        }

        public void AddContributor(User contributor) {
            ContributorIds.Add(contributor.Id);

            AddDomainEvent(new ContributorAddedToSolution() {
                SolutionId = Id,
                UserId = contributor.Id
            });
        }
    }
}