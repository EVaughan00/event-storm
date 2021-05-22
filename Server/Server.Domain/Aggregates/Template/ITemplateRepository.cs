using BuildingBlocks.SeedWork;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface ITemplateRepository : IRepository<Solution>
    {
        Task Create(Template template);
        Task<Template> GetById(string id);
        Task Update(Template template);
        Task Delete(string id);
    }   
}