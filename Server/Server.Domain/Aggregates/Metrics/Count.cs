using System.Collections.Generic;
using BuildingBlocks.SeedWork;

namespace Server.Domain
{
    public class Count : ValueObject
    {
        private int _value;

        public Count(int value) {
            _value = value;
        }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return _value;
        }
    }
}