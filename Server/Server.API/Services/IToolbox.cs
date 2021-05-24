using System.Threading.Tasks;
using Server.Domain;

namespace Server.API.Services
{
    public interface IToolboxService
    {
        Task<Tools> Select(Tools tools, ISelectableTools selection);
        Task Create(Tools tools);
        
    }
}