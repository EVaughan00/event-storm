using System;
using System.Collections.Generic;
using BuildingBlocks.SeedWork;
using MongoDB.Bson;

namespace Server.Domain
{
    public class SolutionReference : ValueObject
    {
        private ObjectId _value;

        public SolutionReference(ObjectId value) {
            this._value = value;
        }
        public ObjectId Value() {
            return _value;
        }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return _value;
        }
    }
}