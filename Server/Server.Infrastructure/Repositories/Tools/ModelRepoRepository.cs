using Microsoft.Extensions.Logging;
using Server.Domain;
using BuildingBlocks.SeedWork;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Server.Infrastructure
{
    public class ModelRepoRepository : IModelRepoRepository
    {
        private ILogger<ModelRepoRepository> _logger;
        private IDbCollection<ModelRepository> _modelRepositorys;
        public static string CollectionName = "ModelRepositories";

        public ModelRepoRepository(ILoggerFactory logger, IDatabaseContext context)
        {
            _logger = logger.CreateLogger<ModelRepoRepository>();
            _modelRepositorys = context.GetCollection<ModelRepository>(CollectionName);
        }

       public async Task Create(ModelRepository modelRepository)
        {
           var existing = _modelRepositorys.FindOne(u => u.Id.Equals(modelRepository.Id));

            if (existing != null) 
                throw new ServerInfrastructureException($"A model repository with id: \"{modelRepository.Id}\" already exists");

            await Task.CompletedTask;
            _modelRepositorys.InsertOne(modelRepository);
        }

        public async Task<ModelRepository> GetById(string id) 
        {
            var result = _modelRepositorys.FindOne(u => u.Id == new ObjectId(id));

            if (result == null) 
                throw new ServerInfrastructureException($"No model repository with an id: \"{id}\" exists");

            await Task.CompletedTask;
            return result;
        }

        public async Task Update(ModelRepository modelRepository)
        {
            var existing = _modelRepositorys.FindOne(u => u.Id == modelRepository.Id);

            if (existing == null)
                throw new ServerInfrastructureException($"No model repository exists to update");

            await Task.CompletedTask;
            _modelRepositorys.UpdateOne(modelRepository);
        }

        public async Task Delete(string id)
        {
            try {
                await Task.CompletedTask;
                _modelRepositorys.DeleteOne(u => u.Id == new ObjectId(id));
            } catch {
                throw new ServerInfrastructureException($"No model repository with id: \"{id}\" exists to delete");
            }
        }
    }
}