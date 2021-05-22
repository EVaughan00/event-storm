using Microsoft.Extensions.Logging;
using Server.Domain;
using BuildingBlocks.SeedWork;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Server.Infrastructure
{
    public class EventStormRepository : IEventStormRepository
    {
        private ILogger<EventStormRepository> _logger;
        private IDbCollection<EventStorm> _eventStorms;
        public static string CollectionName = "EventStorms";

        public EventStormRepository(ILoggerFactory logger, IDatabaseContext context)
        {
            _logger = logger.CreateLogger<EventStormRepository>();
            _eventStorms = context.GetCollection<EventStorm>(CollectionName);
        }

       public async Task Create(EventStorm eventStorm)
        {
           var existing = _eventStorms.FindOne(u => u.Id.Equals(eventStorm.Id));

            if (existing != null) 
                throw new ServerInfrastructureException($"A event storm with id: \"{eventStorm.Id}\" already exists");

            await Task.CompletedTask;
            _eventStorms.InsertOne(eventStorm);
        }

        public async Task<EventStorm> GetById(string id) 
        {
            var result = _eventStorms.FindOne(u => u.Id == new ObjectId(id));

            if (result == null) 
                throw new ServerInfrastructureException($"No event storm with an id: \"{id}\" exists");

            await Task.CompletedTask;
            return result;
        }

        public async Task Update(EventStorm eventStorm)
        {
            var existing = _eventStorms.FindOne(u => u.Id == eventStorm.Id);

            if (existing == null)
                throw new ServerInfrastructureException($"No event storm exists to update");

            await Task.CompletedTask;
            _eventStorms.UpdateOne(eventStorm);
        }

        public async Task Delete(string id)
        {
            try {
                await Task.CompletedTask;
                _eventStorms.DeleteOne(u => u.Id == new ObjectId(id));
            } catch {
                throw new ServerInfrastructureException($"No event storm with id: \"{id}\" exists to delete");
            }
        }
    }
}