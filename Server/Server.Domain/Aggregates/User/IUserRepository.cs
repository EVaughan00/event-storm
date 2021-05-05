using BuildingBlocks.SeedWork;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface IUserRepository : IRepository<User>
    {
        Task Create(User user);
        Task<User> GetByEmail(string email);
        Task<User> GetById(string id);
        Task Update(User user);
        Task Delete(string email);
    }   
}