using System.Threading.Tasks;

namespace BuildingBlocks.Utils
{

    public interface INotificationService
    {
        Task SendAsync(string channel, object message);
        Task SendAsync(string userId, string channel, object message);
    }
}