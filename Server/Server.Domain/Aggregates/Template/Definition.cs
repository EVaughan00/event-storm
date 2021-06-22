using System.Collections.Generic;
using BuildingBlocks.SeedWork;

namespace Server.Domain
{
    public interface ITemplateDefinition {
        string Description { get; set; }
        string CodeBase { get; set; }
    }
    public class TemplateDefinition : ValueObject
    {
        public string Description { get; private set; }
        public string CodeBase { get; private set; }
        public TemplateDefinition() {}
        public void From(ITemplateDefinition definition) {
            Description = definition.Description;
            CodeBase = definition.CodeBase;
        }
        public void SetDescription(string description) {
            Description = description;
        }
        public void SetCodeBase(string codeBase) {
            CodeBase = codeBase;
        }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Description;
            yield return CodeBase;
        }
    }
}