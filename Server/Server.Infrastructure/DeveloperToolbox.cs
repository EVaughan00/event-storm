using System.Collections.Generic;
using System.Threading.Tasks;
using BuildingBlocks.SeedWork;
using Server.Domain;

namespace Server.Infrastructure
{    
    public static class DeveloperToolbox
    {

        public static Tools Tools {
            get {
                Tools tools = new Tools();

                tools.Add(EventStorm);
                tools.Add(ModelRepository);
                tools.Add(TaskStack);

                return tools;
            }
        }

        public static Tool EventStorm {
            get {
                var eventStorm = new EventStorm();

                eventStorm.SetAsActive(true);

                return eventStorm;
            }
        }
        public static Tool ModelRepository {
            get {
                var modelRepo = new ModelRepository();

                modelRepo.SetAsActive(true);

                return modelRepo;
            }
        }

        public static Tool TaskStack {
            get {
                var taskStack = new TaskStack();

                taskStack.SetAsActive(true);

                return taskStack;
            }
        }
    }
}