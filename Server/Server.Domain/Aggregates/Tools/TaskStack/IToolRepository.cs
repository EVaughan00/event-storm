using BuildingBlocks.SeedWork;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface ITaskStackRepository : IRepository<TaskStack>
    {
        Task Create(TaskStack taskStack);
        Task<TaskStack> GetById(string id);
        Task Update(TaskStack taskStack);
        Task Delete(string id);
    }   
}