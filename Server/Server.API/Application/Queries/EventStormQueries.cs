using Server.Domain;
using Microsoft.Extensions.Logging;
using BuildingBlocks.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Server.API.Queries
{
    using Models;
    using MongoDB.Bson;
    using Server.Infrastructure.Utilities;

    public class EventStormQueries : IEventStormQueries
    {
        private readonly IEventStormUtility _eventStorm;
        private readonly IEventBlockRepository _eventBlocks;
        private readonly ILogger<UserQueries> _logger;

        public EventStormQueries(
            ILogger<UserQueries> logger, 
            IEventStormUtility eventStorm,
            IEventBlockRepository eventBlocks
        ) {
            _eventStorm = eventStorm;
            _eventBlocks = eventBlocks;
            _logger = logger;
        }

        public async Task<EventStormDTO> GetBySolutionId(string id) 
        {
            _logger.LogInformation($"Retrieving event storm for solution [{id}]");

            EventStorm result = null;
            try {
                result = await _eventStorm.BuildEventStorm(id);
            } catch {}

            if (result == null || result.Blocks.Count < 1)
                throw new ServerDomainException("Failed to build event storm");

            return EventStormDTO.Map(result);   
        }    

        public async Task<EventBlockDTO> GetBlockById(string id)
        {
            _logger.LogInformation($"Retrieving event block with id [{id}]");

            EventBlock result = null;

            try {
                result = await _eventBlocks.GetById(id);
            } catch {}

            if (result == null)
                throw new ServerDomainException("Failed to retrieve event block");

            return EventBlockDTO.Map(result);
        }
    }
}