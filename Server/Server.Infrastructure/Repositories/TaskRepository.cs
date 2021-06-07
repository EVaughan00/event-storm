using Microsoft.Extensions.Logging;
using Server.Domain;
using BuildingBlocks.SeedWork;
using System.Collections.Generic;
using System;
using MongoDB.Bson;
using System.Threading.Tasks;

namespace Server.Infrastructure
{
    public class TaskRepository : ITaskAggregateRepository
    {
        private ILogger<TaskRepository> _logger;
        private IDbCollection<TaskAggregate> _tasks;
        public static string CollectionName = "Tasks";

        public TaskRepository(ILoggerFactory logger, IDatabaseContext context)
        {
            _logger = logger.CreateLogger<TaskRepository>();
            _tasks = context.GetCollection<TaskAggregate>(CollectionName);
        }

       public async Task Create(TaskAggregate taskStack)
        {
           var existing = _tasks.FindOne(u => u.Id.Equals(taskStack.Id));

            if (existing != null) 
                throw new ServerInfrastructureException($"A task with id: \"{taskStack.Id}\" already exists");

            await Task.CompletedTask;
            _tasks.InsertOne(taskStack);
        }

        public async Task<TaskAggregate> GetById(string id) 
        {
            var result = _tasks.FindOne(u => u.Id == new ObjectId(id));

            if (result == null) 
                throw new ServerInfrastructureException($"No task with an id: \"{id}\" exists");

            await Task.CompletedTask;
            return result;
        }

        public async Task Update(TaskAggregate taskStack)
        {
            var existing = _tasks.FindOne(u => u.Id == taskStack.Id);

            if (existing == null)
                throw new ServerInfrastructureException($"No task exists to update");

            await Task.CompletedTask;
            _tasks.UpdateOne(taskStack);
        }

        public async Task Delete(string id)
        {
            try {
                await Task.CompletedTask;
                _tasks.DeleteOne(u => u.Id == new ObjectId(id));
            } catch {
                throw new ServerInfrastructureException($"No task with id: \"{id}\" exists to delete");
            }
        }
    }
}