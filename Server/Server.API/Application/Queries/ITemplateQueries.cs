using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.API.Queries
{   
    using Models;

    public interface ITemplateQueries {
        Task<List<TemplateDTO>> GetList(UserDetails user);
        
    }
}