using BuildingBlocks.SeedWork;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface ITaskAggregateRepository : IRepository<TaskAggregate>
    {
        Task Create(TaskAggregate task);
        Task<TaskAggregate> GetById(string id);
        // Task<Task> GetBySolution(string solutionId);
        Task Update(TaskAggregate task);
        Task Delete(string id);
    }   
}