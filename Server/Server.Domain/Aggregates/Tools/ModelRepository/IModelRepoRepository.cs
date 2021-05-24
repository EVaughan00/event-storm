using BuildingBlocks.SeedWork;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface IModelRepoRepository : IRepository<ModelRepository>
    {
        Task Create(ModelRepository modelRepo);
        Task<ModelRepository> GetById(string id);
        Task Update(ModelRepository modelRepo);
        Task Delete(string id);
    }   
}