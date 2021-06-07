using BuildingBlocks.SeedWork;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface IEventBlockRepository : IRepository<EventBlock>
    {
        Task Create(EventBlock eventBlock);
        Task<EventBlock> GetById(string id);
        // Task<EventBlock> GetBySolution(string solutionId);
        Task Update(EventBlock eventBlock);
        Task Delete(string id);
    }   
}