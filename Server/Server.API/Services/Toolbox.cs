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

        public async Task<Tools> Select(Tools tools, ISelectableTools selection)
        {

            Tool eventStorm;
            Tool modelRepository;
            Tool taskStack;

            Tools selected = new Tools();

            try {
                eventStorm = await _eventStorms.GetById(tools.EventStormId.ToString());
                modelRepository = await _modelRepos.GetById(tools.ModelRepositoryId.ToString());
                taskStack = await _taskStacks.GetById(tools.TaskStackId.ToString());
            } catch {
                eventStorm = tools.EventStorm;
                modelRepository = tools.ModelRepository;
                taskStack = tools.TaskStack;
            }

            eventStorm.SetAsActive(selection.EventStorm);
            modelRepository.SetAsActive(selection.ModelRepository);
            taskStack.SetAsActive(selection.TaskStack);

            selected.Add(eventStorm);
            selected.Add(modelRepository);
            selected.Add(taskStack);

            await Task.CompletedTask;

            return selected;
        }
    }
}