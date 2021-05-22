using System;
using System.Collections.Generic;
using BuildingBlocks.SeedWork;

namespace Server.Domain
{
    public class Percent : ValueObject
    {
        private double _value;
        public Percent() {}
        public Percent(int percent) {
            _value = percent;
        }
        public Percent(string percent) {
            _value = Convert.ToDouble(percent);
        }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return _value;
        }
    }
}