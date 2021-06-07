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
        private string _description;
        private string _codeBase;
        public SolutionDefinition() {}
        public void From(ISolutionDefinition definition) {
            SetDescription(definition.Description);
            SetCodeBase(definition.CodeBase);
        }
        public void SetDescription(string value) {
            _description = value;
        }
        public void SetCodeBase(string value) {
            _codeBase = value;
        }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return _description;
            yield return _codeBase;
        }
    }
}