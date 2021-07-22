using Microsoft.Extensions.Logging;
using Server.Domain;
using BuildingBlocks.SeedWork;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Server.Infrastructure
{
    public class EventEdgeRepository : IEventEdgeRepository
    {
        private ILogger<EventEdgeRepository> _logger;
        private IDbCollection<EventEdge> _eventEdges;
        public static string CollectionName = "EventEdges";

        public EventEdgeRepository(ILoggerFactory logger, IDatabaseContext context)
        {
            _logger = logger.CreateLogger<EventEdgeRepository>();
            _eventEdges = context.GetCollection<EventEdge>(CollectionName);
        }

       public async Task Create(EventEdge edge)
        {
           var existing = _eventEdges.FindOne(u => u.Id.Equals(edge.Id));

            if (existing != null) 
                throw new ServerInfrastructureException($"A event block with id: \"{edge.Id}\" already exists");

            await Task.CompletedTask;
            _eventEdges.InsertOne(edge);
        }

        public async Task<EventEdge> GetById(string id) 
        {
            var result = _eventEdges.FindOne(u => u.Id == new ObjectId(id));

            if (result == null) 
                throw new ServerInfrastructureException($"No event block with an id: \"{id}\" exists");

            await Task.CompletedTask;
            return result;
        }

        public async Task<List<EventEdge>> GetAllBySolutionId(string id) 
        {
            var result = _eventEdges.FindList(u => u.SolutionId == new ObjectId(id));

            if (result == null) 
                throw new ServerInfrastructureException($"No event block with a solution id: \"{id}\" exists");

            await Task.CompletedTask;
            return result;
        }

        public async Task Update(EventEdge edge)
        {
            var existing = _eventEdges.FindOne(u => u.Id == edge.Id);

            if (existing == null)
                throw new ServerInfrastructureException($"No event block exists to update");

            await Task.CompletedTask;
            _eventEdges.UpdateOne(edge);
        }

        public async Task Delete(string id)
        {
            try {
                await Task.CompletedTask;
                _eventEdges.DeleteOne(u => u.Id == new ObjectId(id));
            } catch {
                throw new ServerInfrastructureException($"No event block with id: \"{id}\" exists to delete");
            }
        }
    }
}