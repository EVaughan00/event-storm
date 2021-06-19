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
        public ObjectId SolutionId { get; private set; }
        public TemplateDefinition Definition { get; private set; }
        public TemplatedTools Tools { get; private set; }

        public Template() {
            Definition = new TemplateDefinition();
        }
        public void SetName(string name) {
            Name = name;
        }
        public void SetOwner(User user) {
            if (OwnerId != new ObjectId())
                throw new ServerDomainException("Template owner already exists");

            OwnerId = user.Id;
        }
        public void DefineFrom(SolutionDefinition definition) {
            Definition.From(definition);

            if (String.IsNullOrEmpty(Definition.Description))
                Definition.SetDescription(Name);
        }
        public void RememberTools(SelectableTools tools) {
            Tools.SelectFrom(tools);
        }
    }
}