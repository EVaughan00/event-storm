using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Server.Domain
{
    public class Template : Entity, IAggregateRoot
    {
        public string Name { get; private set; }
        public ObjectId OwnerId { get; private set; }
        public SolutionDefinition Definition { get; private set; }
        public ObjectId SolutionId { get; private set; }
        public Tool EventStorm { get; private set; }
        public Template() {
            Definition = new SolutionDefinition();
        }
        public void SetName(string name) {
            Name = name;
        }
        public void AddOwner(User user) {
            if (OwnerId != new ObjectId())
                throw new ServerDomainException("Solution owner already exists");

            OwnerId = user.Id;
        }
        public void DefineFrom(ISolutionDefinition definition) {
            Definition.From(definition);

            if (String.IsNullOrEmpty(Definition.Description))
                Definition.SetDescription(Name);
        }

        public void RememberTools(ISelectableTools tools) {

        }
    }
}