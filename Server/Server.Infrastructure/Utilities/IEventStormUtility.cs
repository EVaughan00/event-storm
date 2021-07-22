using System.Threading.Tasks;

namespace Server.Infrastructure.Utilities
{
    public interface IEventStormUtility
    {
        Task<EventStorm> BuildEventStorm(string solutionId);

    }
}