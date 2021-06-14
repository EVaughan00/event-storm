using BuildingBlocks.SeedWork;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface ITemplateRepository : IRepository<Template>
    {
        Task Create(Template template);
        Task<Template> GetById(string id);
        Task<List<Template>> GetAllByOwnerId(string id);
        Task Update(Template template);
        Task Delete(string id);
    }   
}