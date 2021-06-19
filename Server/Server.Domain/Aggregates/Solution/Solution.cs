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
        public SelectableTools Tools { get; private set; }
        public ObjectId TemplateId { get; private set; }
        public List<ObjectId> ContributorIds { get; private set; }
        public Solution() {
            ContributorIds = new List<ObjectId>();
            Definition = new SolutionDefinition();
            Tools = new SelectableTools();
        }
        public void FromBlueprint(SolutionBlueprint blueprint) {
            Name = blueprint.Name;

            Define(blueprint.Definition);
            UseTools(blueprint.SelectedTools);
            
            if (!String.IsNullOrEmpty(blueprint.TemplateId))
                TemplateId = new ObjectId(blueprint.TemplateId);
        }
        public void UseTools(ISelectableTools tools) {
            Tools.SelectFrom(tools);

            if (Tools.AreInactive())
                throw new ServerDomainException("Must use at least one tool");
        }
        public void SetOwner(User user) {
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