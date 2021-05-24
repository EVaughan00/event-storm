using Microsoft.Extensions.Logging;
using Server.Domain;
using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using System.Threading.Tasks;

namespace Server.Infrastructure
{
    public class UserRepository : IUserRepository
    {
        private ILogger<UserRepository> _logger;
        private IDbCollection<User> _users;
        public static string CollectionName = "Users";

        public UserRepository(ILoggerFactory logger, IDatabaseContext context)
        {
            _logger = logger.CreateLogger<UserRepository>();
            _users = context.GetCollection<User>(CollectionName);
        }

        public async Task Create(User user)
        {
           var existing = _users.FindOne(u => u.Email.Equals(user.Email));

            if (existing != null) 
                throw new ServerInfrastructureException($"A user with the email: \"{user.Email.Address}\" already exists");

            await Task.CompletedTask;
            _users.InsertOne(user);
        }
        public async Task<User> GetById(ObjectId id) {
            return await GetById(id.ToString());
        }

        public async Task<User> GetById(string id) 
        {
            var result = _users.FindOne(u => u.Id == new ObjectId(id));

            if (result == null) 
                throw new ServerInfrastructureException($"No user with id: \"{id}\" exists");

            await Task.CompletedTask;
            return result;
        }

        public async Task<User> GetByEmail(string email) 
        {
            email = email.ToLower();
            var result = _users.FindOne(u => u.Email.Equals(email));

            if (result == null)
                throw new ServerInfrastructureException($"No user with email: \"{email}\" exists");
            
            await Task.CompletedTask;
            return result;
        }

        public async Task Update(User user)
        {
            var existing = _users.FindOne(u => u.Id == user.Id);
            var duplicate = _users.FindOne(u => u.Email.Equals(user.Email.Address));

            if (existing == null)
                throw new ServerInfrastructureException($"No user exists to update");

            if (duplicate != null && !existing.Equals(duplicate))  
            {                
                var ex = new ApiException($"That email is already taken");
                ex.AddError("email", ex.Message);

                throw ex;
            }

            await Task.CompletedTask;
            _users.UpdateOne(user);
        }

        public async Task Delete(string email)
        {
            try {
                await GetByEmail(email);
                _users.DeleteOne(u => u.Email.Address == email);
            } catch {
                throw new ServerInfrastructureException($"No user with an email: \"{email}\" exists to delete");
            }
        }
    }
}