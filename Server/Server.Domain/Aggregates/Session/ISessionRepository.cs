using BuildingBlocks.SeedWork;
using System.Collections.Generic;
using MongoDB.Bson;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface ISessionRepository : IRepository<Session>
    {
        Task Clear(User user);
        Task ClearAll();
        Task ClearExpired(int hourRange);
        Task<List<Session>> GetAll(SessionStatus status);
        Task<Session> Retrieve(User user);
        Task<Session> Retrieve(ObjectId sessionId);
        Task<Session> Recover(User user);
        Task Start(User user);
        Task Start(User user, bool remembered);
        Task Update(Session session);
    }
    
}