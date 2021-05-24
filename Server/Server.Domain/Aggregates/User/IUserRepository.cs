using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface IUserRepository : IRepository<User>
    {
        Task Create(User user);
        Task<User> GetByEmail(string email);
        Task<User> GetById(string id);
        Task<User> GetById(ObjectId id);
        Task Update(User user);
        Task Delete(string email);
    }   
}