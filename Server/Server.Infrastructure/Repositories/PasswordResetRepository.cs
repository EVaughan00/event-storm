using Microsoft.Extensions.Logging;
using Server.Domain;
using BuildingBlocks.SeedWork;
using System;
using System.Threading.Tasks;

namespace Server.Infrastructure
{
    public class PasswordResetRepository : IPasswordResetRepository
    {
        private ILogger<PasswordResetRepository> _logger;
        private IDbCollection<PasswordReset> _resets;
        public static string CollectionName = "PasswordResets";

        public PasswordResetRepository(ILoggerFactory logger, IDatabaseContext context)
        {
            _logger = logger.CreateLogger<PasswordResetRepository>();
            _resets = context.GetCollection<PasswordReset>(CollectionName);
        }

        public async Task<PasswordReset> GetOne(User user)
        {
            var reset = _resets.FindOne(r => r.UserId == user.Id);

            if (reset == null)
                throw new ServerInfrastructureException("Password reset does not exist for this user");

            await Task.CompletedTask;
            return reset;
        }

        public async Task<PasswordReset> GetOne(string resetCode)
        {
            var reset = _resets.FindOne(r => r.ResetCode.Value == resetCode);

            if (reset == null) 
                throw new ServerInfrastructureException("Password reset does not exist with this code");

            await Task.CompletedTask;
            return reset;
        }

        public async Task Create(PasswordReset reset)
        {
            var existing = _resets.FindOne(r => r.UserId == reset.UserId);
            
            if (existing != null) 
                throw new ServerInfrastructureException("Password reset already exists");

            await Task.CompletedTask;
            _resets.InsertOne(reset);
        }

        public async Task Update(PasswordReset reset)
        {
            var existing = _resets.FindOne(r => r.UserId == reset.UserId);
            
            if (existing == null) 
                throw new ServerInfrastructureException("No password update exists to update");

            await Task.CompletedTask;
            _resets.UpdateOne(reset);
        }

        public async Task Remove(PasswordReset reset)
        {
            var existing = _resets.FindOne(r => r.UserId == reset.UserId);
            
            if (existing == null)
                throw new ServerInfrastructureException("No password update exists to update");

            await Task.CompletedTask;
            _resets.DeleteOne(reset);
        }

        public async Task ClearExpired()
        {
            _resets.DeleteMany(r => r.Expiry < DateTime.Now);

            await Task.CompletedTask;
        }

    }

}