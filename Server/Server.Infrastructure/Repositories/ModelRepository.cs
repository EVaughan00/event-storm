using Microsoft.Extensions.Logging;
using Server.Domain;
using BuildingBlocks.SeedWork;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Server.Infrastructure
{
    public class ModelRepository : IModelRepository
    {
        private ILogger<ModelRepository> _logger;
        private IDbCollection<Model> _models;
        public static string CollectionName = "Models";

        public ModelRepository(ILoggerFactory logger, IDatabaseContext context)
        {
            _logger = logger.CreateLogger<ModelRepository>();
            _models = context.GetCollection<Model>(CollectionName);
        }

       public async Task Create(Model modelRepository)
        {
           var existing = _models.FindOne(u => u.Id.Equals(modelRepository.Id));

            if (existing != null) 
                throw new ServerInfrastructureException($"A model with id: \"{modelRepository.Id}\" already exists");

            await Task.CompletedTask;
            _models.InsertOne(modelRepository);
        }

        public async Task<Model> GetById(string id) 
        {
            var result = _models.FindOne(u => u.Id == new ObjectId(id));

            if (result == null) 
                throw new ServerInfrastructureException($"No model with an id: \"{id}\" exists");

            await Task.CompletedTask;
            return result;
        }

        public async Task Update(Model modelRepository)
        {
            var existing = _models.FindOne(u => u.Id == modelRepository.Id);

            if (existing == null)
                throw new ServerInfrastructureException($"No model exists to update");

            await Task.CompletedTask;
            _models.UpdateOne(modelRepository);
        }

        public async Task Delete(string id)
        {
            try {
                await Task.CompletedTask;
                _models.DeleteOne(u => u.Id == new ObjectId(id));
            } catch {
                throw new ServerInfrastructureException($"No model with id: \"{id}\" exists to delete");
            }
        }
    }
}