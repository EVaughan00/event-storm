using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface ISolutionRepository : IRepository<Solution>
    {
        Task Create(Solution solution);
        Task<Solution> GetById(string id);
        Task<Solution> GetByNameAndOwnerId(string name, string ownerId);
        Task<List<Solution>> GetAllByContributorId(string id);
        Task Update(Solution solution);
        Task Delete(Solution solution);
        Task Delete(string id);
    }   
}