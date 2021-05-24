using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface ISolutionRepository : IRepository<Solution>
    {
        Task Create(Solution solution);
        Task<Solution> GetById(string id);
        Task<Solution> GetById(ObjectId id);
        Task Update(Solution solution);
        Task Delete(Solution solution);
        Task Delete(string id);
    }   
}