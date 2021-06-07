using BuildingBlocks.SeedWork;

namespace Server.Domain
{
    public interface IModelRepository : IRepository<Model>
    {
        System.Threading.Tasks.Task Create(Model model);
        System.Threading.Tasks.Task<Model> GetById(string id);
        // Task<Model> GetBySolution(string solutionId);
        System.Threading.Tasks.Task Update(Model model);
        System.Threading.Tasks.Task Delete(string id);
    }   
}