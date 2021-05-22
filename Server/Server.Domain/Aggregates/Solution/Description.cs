using System.Collections.Generic;
using BuildingBlocks.SeedWork;

namespace Server.Domain
{
    public class SolutionDescription : ValueObject
    {
        private string _value;
        public SolutionDescription() {}
        public SolutionDescription(string value) {
            _value = value;
        }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return _value;
        }
    }
}