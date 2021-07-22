using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.API.Queries
{   
    using Models;
    using MongoDB.Bson;

    public interface IEventStormQueries {
        Task<EventStormDTO> GetOneBySolutionId(string id);
    }
}