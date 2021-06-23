using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.API.Queries
{   
    using Models;

    public interface ISolutionQueries {
        Task<List<SolutionDTO>> GetList(UserDetails user);
        Task<SolutionDTO> GetOneById(UserDetails user, string id);
        Task<SolutionDTO> GetOneByName(UserDetails user, string name);
    }
}