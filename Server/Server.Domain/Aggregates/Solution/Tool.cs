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


    public interface ISelectableTools
    {
        bool EventStorm { get; set; }
        bool ModelRepository { get; set; }
        bool TaskStack { get; set; }
    }

    public class SelectableTools : ValueObject {
        public Tool EventStorm { get; private set; }
        public Tool ModelRepository { get; private set; }
        public Tool TaskStack { get; private set; }

        public SelectableTools() {
            EventStorm = new Tool();
            TaskStack = new Tool();
            ModelRepository = new Tool();
        }

        public void SelectFrom(ISelectableTools tools) {
            EventStorm.SetActive(tools.EventStorm);
            ModelRepository.SetActive(tools.ModelRepository);
            TaskStack.SetActive(tools.TaskStack);
        }

        public bool AreInactive() {
            return !EventStorm.Active
                && !ModelRepository.Active
                && !TaskStack.Active;
        }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return EventStorm;
            yield return ModelRepository;
            yield return TaskStack;

        }
    }
}