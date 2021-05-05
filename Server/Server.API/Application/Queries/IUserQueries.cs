using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.API.Queries
{   
    using Models;

    public interface IUserQueries {
        Task<UserDetails> GetDetails(IdentityClaims claims);
        Task<bool> ValidateUser(IdentityClaims claims);
    }
}