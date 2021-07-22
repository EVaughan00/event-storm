using Microsoft.Extensions.Logging;
using Server.Domain;
using BuildingBlocks.SeedWork;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Server.Infrastructure
{
    public class EventBlockRepository : IEventBlockRepository
    {
        private ILogger<EventBlockRepository> _logger;
        private IDbCollection<EventBlock> _eventBlocks;
        public static string CollectionName = "EventBlocks";

        public EventBlockRepository(ILoggerFactory logger, IDatabaseContext context)
        {
            _logger = logger.CreateLogger<EventBlockRepository>();
            _eventBlocks = context.GetCollection<EventBlock>(CollectionName);
        }

       public async Task Create(EventBlock block)
        {
           var existing = _eventBlocks.FindOne(u => u.Id.Equals(block.Id));

            if (existing != null) 
                throw new ServerInfrastructureException($"A event block with id: \"{block.Id}\" already exists");

            await Task.CompletedTask;
            _eventBlocks.InsertOne(block);
        }

        public async Task<EventBlock> GetById(string id) 
        {
            var result = _eventBlocks.FindOne(u => u.Id == new ObjectId(id));

            if (result == null) 
                throw new ServerInfrastructureException($"No event block with an id: \"{id}\" exists");

            await Task.CompletedTask;
            return result;
        }

        public async Task<List<EventBlock>> GetAllBySolutionId(string id) 
        {
            var result = _eventBlocks.FindList(u => u.SolutionId == new ObjectId(id));

            if (result == null) 
                throw new ServerInfrastructureException($"No event block with a solution id: \"{id}\" exists");

            await Task.CompletedTask;
            return result;
        }

        public async Task Update(EventBlock block)
        {
            var existing = _eventBlocks.FindOne(u => u.Id == block.Id);

            if (existing == null)
                throw new ServerInfrastructureException($"No event block exists to update");

            await Task.CompletedTask;
            _eventBlocks.UpdateOne(block);
        }

        public async Task Delete(string id)
        {
            try {
                await Task.CompletedTask;
                _eventBlocks.DeleteOne(u => u.Id == new ObjectId(id));
            } catch {
                throw new ServerInfrastructureException($"No event block with id: \"{id}\" exists to delete");
            }
        }
    }
}