using Microsoft.Extensions.Logging;
using Server.Domain;
using BuildingBlocks.SeedWork;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Server.Infrastructure
{
    public class TemplateRepository : ITemplateRepository
    {
        private ILogger<TemplateRepository> _logger;
        private IDbCollection<Template> _templates;
        public static string CollectionName = "Templates";

        public TemplateRepository(ILoggerFactory logger, IDatabaseContext context)
        {
            _logger = logger.CreateLogger<TemplateRepository>();
            _templates = context.GetCollection<Template>(CollectionName);
        }

       public async Task Create(Template template)
        {
           var existing = _templates.FindOne(u => u.Name.Equals(template.Name));

            if (existing != null) 
                throw new ServerInfrastructureException($"A template with name: \"{template.Name}\" already exists");

            await Task.CompletedTask;
            _templates.InsertOne(template);
        }

        public async Task<Template> GetByName(string name) 
        {
            var result = _templates.FindOne(u => u.Name.Equals(name));

            if (result == null) 
                throw new ServerInfrastructureException($"No template with name: \"{name}\" exists");

            await Task.CompletedTask;
            return result;
        }

        public async Task<Template> GetById(string id) 
        {
            var result = _templates.FindOne(u => u.Id == new ObjectId(id));

            if (result == null) 
                throw new ServerInfrastructureException($"No template with an id: \"{id}\" exists");

            await Task.CompletedTask;
            return result;
        }

        public async Task<List<Template>> GetAllByOwnerId(string id) {

            List<Template> list = new List<Template>();

            foreach (Template template in _templates.FindAll()) 
                if (template.OwnerId == new ObjectId(id))
                    list.Add(template);

            await Task.CompletedTask;
            return list;
        }

        public async Task Update(Template template)
        {
            var existing = _templates.FindOne(u => u.Id == template.Id);
            var duplicate = _templates.FindOne(u => u.Name.Equals(template.Name));

            if (existing == null)
                throw new ServerInfrastructureException($"No template exists to update");

            if (duplicate != null && !existing.Equals(duplicate))  
            {                
                _logger.LogInformation("Found template with duplicate name: " + duplicate.Name);
            }

            await Task.CompletedTask;
            _templates.UpdateOne(template);
        }

        public async Task Delete(string id)
        {
            try {
                await Task.CompletedTask;
                _templates.DeleteOne(u => u.Id == new ObjectId(id));
            } catch {
                throw new ServerInfrastructureException($"No template with id: \"{id}\" exists to delete");
            }
        }
    }
}