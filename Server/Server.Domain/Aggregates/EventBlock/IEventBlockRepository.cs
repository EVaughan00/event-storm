using BuildingBlocks.SeedWork;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface IEventBlockRepository : IRepository<EventBlock>
    {
        Task Create(EventBlock eventBlock);
        Task<EventBlock> GetById(string id);
        Task<List<EventBlock>> GetAllBySolutionId(string solutionId);
        Task Update(EventBlock eventBlock);
        Task Delete(string id);
    }   
}