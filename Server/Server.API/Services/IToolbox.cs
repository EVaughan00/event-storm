using System.Threading.Tasks;
using Server.Domain;

namespace Server.API.Services
{
    public interface IToolboxService
    {
        Task<Tools> SelectNew(ISelectableTools tools);
        Task Create(Tools tools);
        
    }
}