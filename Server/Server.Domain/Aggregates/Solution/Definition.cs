using System.Collections.Generic;
using BuildingBlocks.SeedWork;

namespace Server.Domain
{
    public interface ISolutionDefinition {
        string Description { get; set; }
        string CodeBase { get; set; }
    }
    public class SolutionDefinition : ValueObject
    {
        public string Description { get; private set; }
        public string CodeBase { get; private set; }
        public SolutionDefinition() {}
        public void From(ISolutionDefinition definition) {
            Description = definition.Description;
            CodeBase = definition.CodeBase;
        }
        public void SetDescription(string description) {
            Description = description;
        }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Description;
            yield return CodeBase;
        }
    }
}