using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Server.Domain
{
    public class SolutionBlueprint {
        public string Name { get; set; }        
        public string TemplateId { get; set; }
        public ISolutionDefinition Definition { get; set; }
        public ISelectableTools SelectedTools { get; set; }
    }
    public class Solution : Entity, IAggregateRoot
    {
        public string Name { get; private set; }
        public ObjectId OwnerId { get; private set; }
        public SolutionDefinition Definition { get; private set; }
        public Tool EventStorm { get; private set; }
        public Tool TaskStack { get; private set; }
        public Tool ModelRepository { get; private set; }
        // TODO: Move to application query or whatever
        // [BsonElement("TempatedAsIds")]
        // public List<ObjectId> TempatedAsIds { get; private set; }
        public ObjectId FromTemplateId { get; private set; }
        public List<ObjectId> ContributorIds { get; private set; }
        public Solution() {
            ContributorIds = new List<ObjectId>();
            Definition = new SolutionDefinition();

            EventStorm = new Tool();
            TaskStack = new Tool();
            ModelRepository = new Tool();
        }
        public void FromBlueprint(SolutionBlueprint blueprint) {
            Name = blueprint.Name;

            Define(blueprint.Definition);
            UseTools(blueprint.SelectedTools);
            
            if (!String.IsNullOrEmpty(blueprint.TemplateId))
                FromTemplateId = new ObjectId(blueprint.TemplateId);
        }
        public void UseTools(ISelectableTools selection) {
            EventStorm.SetActive(selection.UseEventStorm);
            ModelRepository.SetActive(selection.UseModelRepository);
            TaskStack.SetActive(selection.UseTaskStack);
        }
        public void AddOwner(User user) {
            if (OwnerId != new ObjectId())
                throw new ServerDomainException("Solution owner already exists");

            OwnerId = user.Id;
            AddContributor(user);
        }
        public void Define(ISolutionDefinition definition) {

            Definition.From(definition);

            if (String.IsNullOrEmpty(definition.Description)) {
                Definition.SetDescription(Name);
            }
        }

        public void AddContributor(User contributor) {

            if (ContributorIds.Contains(contributor.Id))
                throw new ServerDomainException("Solution already has contributor: " + contributor.Email);

            ContributorIds.Add(contributor.Id);

            AddDomainEvent(new ContributorAddedToSolution() {
                SolutionId = Id,
                UserId = contributor.Id
            });
        }
    }
}