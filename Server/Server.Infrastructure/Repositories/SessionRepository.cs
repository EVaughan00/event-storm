using Microsoft.Extensions.Logging;
using Server.Domain;
using BuildingBlocks.SeedWork;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Server.Infrastructure
{
    public class SessionRepository : ISessionRepository
    {
        private ILogger<SessionRepository> _logger;
        private IDbCollection<Session> _sessions;
        public static string CollectionName = "Sessions";

        public SessionRepository(ILoggerFactory logger, IDatabaseContext context)
        {
            _logger = logger.CreateLogger<SessionRepository>();
            _sessions = context.GetCollection<Session>(CollectionName);
        }

        public async Task<Session> Recover(User user)
        {
            var session = await Retrieve(user);            

            if (session.Status.Equals(SessionStatus.Active))
                return session; 

            session.ChangeStatus(SessionStatus.Active);
            _sessions.UpdateOne(session);

            return session;
        }

        public async Task<Session> Retrieve(User user)
        {
            var session = _sessions.FindOne(s => s.Claims.Email == user.Email.Address);

            if (session == null)
                throw new ServerInfrastructureException($"No session for user: {user.Email.Address} exists");
          
            await Task.CompletedTask;
            return session;
        }        

        public async Task<Session> Retrieve(ObjectId sessionId)
        {
            var session = _sessions.FindOne(s => s.Id == sessionId);

            if (session == null)
                throw new ServerInfrastructureException($"No session with Id: {sessionId} exists");

            await Task.CompletedTask;
            return session;
        }

        public async Task Start(User user) => await Start(user, false);

        public async Task Start(User user, bool remembered)
        {
            try {              
                var session = await Retrieve(user);
            } catch {
                var session = new Session(user);

                session.Remember = remembered;
                _sessions.InsertOne(session);
            }          

            throw new ServerInfrastructureException($"Session for user: {user.Email.Address} already exists");
        }

        public async Task Clear(User user)
        {
            await Retrieve(user);

            _sessions.DeleteOne(s => s.Claims.Email == user.Email.Address);
        }

        public async Task Update(Session session) 
        {
            var existing = _sessions.FindOne(session.Id);

            if (existing == null)
                throw new ServerInfrastructureException($"No session for user: {session.Claims.Email} exists");

            await Task.CompletedTask;
            _sessions.UpdateOne(session);
        }

        public async Task<List<Session>> GetAll(SessionStatus status)
        {
            var list = _sessions.FindList(s => s.Status.Name == status.Name);
            
            await Task.CompletedTask;
            return list;
        }

        public async Task ClearExpired(int hourRange)
        {
            _sessions.DeleteMany(s => 
                s.Status.Name == SessionStatus.Expired.Name &&
                s.Remember == false &&
                s.Expiry < DateTime.Now.AddHours(hourRange * -1)
            );

            await Task.CompletedTask;      
        }

        public async Task ClearAll()
        {            
            _sessions.DeleteMany(s => true);

            await Task.CompletedTask;
        }

    }

}