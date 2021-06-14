using System.Collections.Generic;
using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Server.Domain
{
    public class Tool : ValueObject
    {        
        public bool Active { get; private set; }
        public Tool() {}
        public void SetActive(bool active) {
            Active = active;
        }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Active;
        }
    }

    public interface ISelectableTools {
        bool UseEventStorm {get; set;}
        bool UseModelRepository {get; set;}
        bool UseTaskStack {get; set;}
    }
}