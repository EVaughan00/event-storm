using System.Collections.Generic;
using System.Threading.Tasks;
using BuildingBlocks.SeedWork;

namespace Server.Domain
{
    public interface IEventEdgeRepository : IRepository<EventEdge>
    {
        Task Create(EventEdge eventEdge);
        Task<EventEdge> GetById(string id);
        Task<List<EventEdge>> GetAllBySolutionId(string solutionId);
        Task Update(EventEdge eventEdge);
        Task Delete(string id);
    }   
}