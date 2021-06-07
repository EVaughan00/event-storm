using BuildingBlocks.SeedWork;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface IMetricsSnapshotRepository : IRepository<MetricsSnapshot>
    {
        Task Create(MetricsSnapshot snapshot);
        Task<MetricsSnapshot> GetById(string id);
        // Task<MetricsSnapshot> GetBySolution(Solution solution);
        Task Update(MetricsSnapshot snapshot);
        Task Delete(string id);
    }   
}