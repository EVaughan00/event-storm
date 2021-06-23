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

        public async Task<SolutionDTO> GetOneById(UserDetails user, string id) 
        {
            _logger.LogInformation($"Retrieving solution with id [{id}] for use [{user.Email}]");

            var solution = await _solutions.GetById(id.ToString());

            if (!solution.ContributorIds.Contains(new ObjectId(user.Id)))
                throw new ServerDomainException("User is not a contributor on this solution");

            return SolutionDTO.Map(solution);   
        }  

        public async Task<SolutionDTO> GetOneByName(UserDetails user, string name) 
        {
            _logger.LogInformation($"Retrieving solution with name [{name}] for user [{user.Email}]");

            var solution = await _solutions.GetByNameAndOwnerId(name, user.Id.ToString());

            return SolutionDTO.Map(solution);   
        }  
    }
}