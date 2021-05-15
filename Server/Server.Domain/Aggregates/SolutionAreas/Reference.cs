using System;
using System.Collections.Generic;
using BuildingBlocks.SeedWork;

namespace Server.Domain
{
    public class SolutionAreaReference : ValueObject
    {
        private Guid _value;

        public SolutionAreaReference(Guid value) {
            this._value = value;
        }
        public Guid Value() {
            return _value;
        }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return _value;
        }
    }
}