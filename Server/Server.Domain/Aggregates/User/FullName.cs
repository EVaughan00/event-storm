using BuildingBlocks.SeedWork;
using System.Collections.Generic;

namespace Server.Domain
{
    public class FullName : ValueObject
    {
        private string _value;

        public FullName() { }

        public FullName(string first, string last)
        {
            if (first == null || last == null)
                throw new ServerDomainException("The first or last name was not defined");

            _value =  first + " " + last;
        }

        public override string ToString() => _value != null ? _value : 
            throw new ServerDomainException("The first or last name was not defined");

        public bool Equals(string fullName) 
        {
            return _value == fullName;
        }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return _value;
        } 
    }
}