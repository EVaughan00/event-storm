using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Server.Domain;
using Server.Infrastructure;

namespace Server.API.Services
{
    public class ToolboxService : IToolboxService
    {
        private readonly ILogger<ToolboxService> _logger;
        private readonly IEventStormRepository _eventStorms;
        private readonly IModelRepoRepository _modelRepos;
        private readonly ITaskStackRepository _taskStacks;

        public ToolboxService(
            ILogger<ToolboxService> logger,
            IEventStormRepository eventStorms,
            IModelRepoRepository modelRepos,
            ITaskStackRepository taskStacks
            )
        {
            _logger = logger;
            _eventStorms = eventStorms;
            _modelRepos = modelRepos;
            _taskStacks = taskStacks;
        }
        public async Task Create(Tools tools)
        {
            await _eventStorms.Create(tools.EventStorm);
            await _modelRepos.Create(tools.ModelRepository);
            await _taskStacks.Create(tools.TaskStack);

        }

        public async Task<Tools> SelectNew(ISelectableTools selected)
        {
                var eventStorm = DeveloperToolbox.EventStorm;
                var modelRepo = DeveloperToolbox.ModelRepository;
                var taskStack = DeveloperToolbox.TaskStack;

                eventStorm.SetAsActive(selected.EventStorm);
                modelRepo.SetAsActive(selected.ModelRepository);
                taskStack.SetAsActive(selected.TaskStack);

                Tools tools = new Tools();

                tools.Add(eventStorm);
                tools.Add(taskStack);
                tools.Add(modelRepo);

                await Task.CompletedTask;

                return tools;
        }
    }
}