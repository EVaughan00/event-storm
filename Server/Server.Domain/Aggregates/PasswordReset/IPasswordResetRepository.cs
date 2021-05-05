using BuildingBlocks.SeedWork;
using System.Threading.Tasks;

namespace Server.Domain
{
    public interface IPasswordResetRepository : IRepository<PasswordReset>
    {
        Task<PasswordReset> GetOne(User user);
        Task<PasswordReset> GetOne(string resetCode);
        Task Create(PasswordReset reset);
        Task Update(PasswordReset reset);
        Task Remove(PasswordReset reset);
        Task ClearExpired();
    }
}