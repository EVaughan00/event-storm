using System.Collections.Generic;
using BuildingBlocks.SeedWork;

namespace Server.Domain
{
    public interface ITemplateDefinition {
        string Description { get; set; }
    }
    public class TemplateDefinition : ValueObject
    {
        private string _description;
        public TemplateDefinition() {}
        public void From(ITemplateDefinition definition) {
            SetDescription(definition.Description);
        }
        public void SetDescription(string value) {
            _description = value;
        }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return _description;
        }
    }
}