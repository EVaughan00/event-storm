using System.Collections.Generic;
using BuildingBlocks.SeedWork;

namespace Server.Domain
{
    public class TemplatedTool : Entity
    {
        public bool Active { get; private set; }
        public ToolFilter Filter { get; private set; }
        public TemplatedTool() {}
        public void SetActive(bool active) {
            Active = active;
        }
    }

    public class ToolFilter : ValueObject
    {
        
        protected override IEnumerable<object> GetAtomicValues()
        {
            throw new System.NotImplementedException();
        }
    }
}