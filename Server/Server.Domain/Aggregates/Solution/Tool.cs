using System.Collections.Generic;
using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Server.Domain
{
    public class Tool : ValueObject
    {        
        private bool _active;
        public Tool() {}
        public void SetActive(bool active) {
            _active = active;
        }
        public bool IsActive() {
            return _active;
        }

        protected override IEnumerable<object> GetAtomicValues()
        {
            throw new System.NotImplementedException();
        }
    }

    public interface ISelectableTools {
        bool UseEventStorm {get; set;}
        bool UseModelRepository {get; set;}
        bool UseTaskStack {get; set;}
    }
}