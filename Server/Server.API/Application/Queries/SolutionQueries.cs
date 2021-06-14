using Server.Domain;
using Microsoft.Extensions.Logging;
using BuildingBlocks.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Server.API.Queries
{
    using Models;

    public class SolutionQueries : ISolutionQueries
    {
        private readonly ISolutionRepository _solutions;
        private readonly ILogger<UserQueries> _logger;
        private readonly ISessionRepository _sessions;

        public SolutionQueries(
            ILogger<UserQueries> logger, 
            ISessionRepository sessionRepository, 
            ISolutionRepository solutionRepository
        ) {
            _solutions = solutionRepository;
            _sessions = sessionRepository;
            _logger = logger;
        }

        public async Task<List<SolutionDTO>> GetList(UserDetails user) 
        {
            _logger.LogInformation($"Retrieving all solutions for [{user.Email}]");

            var solutions = await _solutions.GetAllByContributorId(user.Id.ToString());

            List<SolutionDTO> list = new List<SolutionDTO>();

            foreach (Solution solution in solutions)
                list.Add(SolutionDTO.Map(solution));

            return list;   
        }  

  
    }
}