using Microsoft.Extensions.Logging;
using Server.Domain;
using BuildingBlocks.SeedWork;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Server.Infrastructure
{
    public class SolutionRepository : ISolutionRepository
    {
        private ILogger<SolutionRepository> _logger;
        private IDbCollection<Solution> _solutions;
        public static string CollectionName = "Solutions";

        public SolutionRepository(ILoggerFactory logger, IDatabaseContext context)
        {
            _logger = logger.CreateLogger<SolutionRepository>();
            _solutions = context.GetCollection<Solution>(CollectionName);
        }

       public async Task Create(Solution solution)
        {
           var existing = _solutions.FindOne(u => u.Name.Equals(solution.Name));

            if (existing != null) 
                throw new ServerInfrastructureException($"A solution with name: \"{solution.Name}\" already exists");

            await Task.CompletedTask;
            _solutions.InsertOne(solution);
        }
        public async Task<Solution> GetByName(string name) 
        {
            var result = _solutions.FindOne(u => u.Name.Equals(name));

            if (result == null) 
                throw new ServerInfrastructureException($"No solution with name: \"{name}\" exists");

            await Task.CompletedTask;
            return result;
        }
        public async Task<Solution> GetById(ObjectId id) {
            return await GetById(id.ToString());
        }
        public async Task<Solution> GetById(string id) {
            var result = _solutions.FindOne(u => u.Id == new ObjectId(id));

            if (result == null) 
                throw new ServerInfrastructureException($"No solution with an id: \"{id}\" exists");

            await Task.CompletedTask;
            return result;
        }

        public async Task Update(Solution solution)
        {
            var existing = _solutions.FindOne(u => u.Id == solution.Id);
            var duplicate = _solutions.FindOne(u => u.Name.Equals(solution.Name));

            if (existing == null)
                throw new ServerInfrastructureException($"No solution exists to update");

            if (duplicate != null && !existing.Equals(duplicate))  
            {                
                _logger.LogInformation("Found solution with duplicate name: " + duplicate.Name);
            }

            await Task.CompletedTask;
            _solutions.UpdateOne(solution);
        }

        public async Task Delete(Solution solution)
        {
            try {
                await Task.CompletedTask;
                _solutions.DeleteOne(s => s.Id == solution.Id);
            } catch {
                throw new ServerInfrastructureException($"No solution with id: \"{solution.Id}\" exists to delete");
            }
        }

        public async Task Delete(string id)
        {
            try {
                await Task.CompletedTask;
                _solutions.DeleteOne(u => u.Id == new ObjectId(id));
            } catch {
                throw new ServerInfrastructureException($"No solution with id: \"{id}\" exists to delete");
            }
        }
    }
}