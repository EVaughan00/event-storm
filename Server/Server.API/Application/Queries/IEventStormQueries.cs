using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.API.Queries
{   
    using Models;
    using MongoDB.Bson;

    public interface IEventStormQueries {
        Task<EventStormDTO> GetBySolutionId(string id);
        Task<EventBlockDTO> GetBlockById(string id);
    }
}