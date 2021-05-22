using BuildingBlocks.SeedWork;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface IEventStormRepository : IRepository<EventStorm>
    {
        Task Create(EventStorm eventStorm);
        Task<EventStorm> GetById(string id);
        Task Update(EventStorm eventStorm);
        Task Delete(string id);
    }   
}