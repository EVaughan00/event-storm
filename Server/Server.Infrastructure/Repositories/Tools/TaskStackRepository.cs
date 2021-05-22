using Microsoft.Extensions.Logging;
using Server.Domain;
using BuildingBlocks.SeedWork;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Server.Infrastructure
{
    public class TaskStackRepository : ITaskStackRepository
    {
        private ILogger<TaskStackRepository> _logger;
        private IDbCollection<TaskStack> _taskStacks;
        public static string CollectionName = "TaskStacks";

        public TaskStackRepository(ILoggerFactory logger, IDatabaseContext context)
        {
            _logger = logger.CreateLogger<TaskStackRepository>();
            _taskStacks = context.GetCollection<TaskStack>(CollectionName);
        }

       public async Task Create(TaskStack taskStack)
        {
           var existing = _taskStacks.FindOne(u => u.Id.Equals(taskStack.Id));

            if (existing != null) 
                throw new ServerInfrastructureException($"A task stack with id: \"{taskStack.Id}\" already exists");

            await Task.CompletedTask;
            _taskStacks.InsertOne(taskStack);
        }

        public async Task<TaskStack> GetById(string id) 
        {
            var result = _taskStacks.FindOne(u => u.Id == new ObjectId(id));

            if (result == null) 
                throw new ServerInfrastructureException($"No task stack with an id: \"{id}\" exists");

            await Task.CompletedTask;
            return result;
        }

        public async Task Update(TaskStack taskStack)
        {
            var existing = _taskStacks.FindOne(u => u.Id == taskStack.Id);

            if (existing == null)
                throw new ServerInfrastructureException($"No task stack exists to update");

            await Task.CompletedTask;
            _taskStacks.UpdateOne(taskStack);
        }

        public async Task Delete(string id)
        {
            try {
                await Task.CompletedTask;
                _taskStacks.DeleteOne(u => u.Id == new ObjectId(id));
            } catch {
                throw new ServerInfrastructureException($"No task stack with id: \"{id}\" exists to delete");
            }
        }
    }
}