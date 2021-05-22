using System.Collections.Generic;
using BuildingBlocks.SeedWork;

namespace Server.Domain
{
    public class TemplateDescription : ValueObject
    {
        private string _value;
        public TemplateDescription() {}
        public TemplateDescription(string value) {
            _value = value;
        }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return _value;
        }
    }
}