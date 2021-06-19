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

    public class TemplatedTools : ValueObject {
        public TemplatedTool EventStorm { get; private set; }
        public TemplatedTool TaskStack { get; private set; }
        public TemplatedTool ModelRepository { get; private set; }

        public TemplatedTools() {
            EventStorm = new TemplatedTool();
            TaskStack = new TemplatedTool();
            ModelRepository = new TemplatedTool();
        }

        public void SelectFrom(SelectableTools tools) {
            EventStorm.SetActive(tools.EventStorm.Active);
            ModelRepository.SetActive(tools.ModelRepository.Active);
            TaskStack.SetActive(tools.TaskStack.Active);
        }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return EventStorm;
            yield return ModelRepository;
            yield return TaskStack;
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