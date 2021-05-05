using Server.Domain;
using Microsoft.Extensions.Logging;
using BuildingBlocks.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Server.API.Queries
{
    using Models;

    public class UserQueries : IUserQueries
    {
        private readonly IUserRepository _users;
        private readonly ILogger<UserQueries> _logger;
        private readonly ISessionRepository _sessions;

        public UserQueries(
            ILogger<UserQueries> logger, 
            ISessionRepository sessionRepository, 
            IUserRepository userRepository
        ) {
            _users = userRepository;
            _sessions = sessionRepository;
            _logger = logger;
        }

        public async Task<UserDetails> GetDetails(IdentityClaims claim) 
        {
            _logger.LogInformation($"Querying user detials [{claim.Email}]");

            var user = await _users.GetByEmail(claim.Email);

            return UserDetails.Map(user);   
        }  

        public async Task<bool> ValidateUser(IdentityClaims claim)
        {
            _logger.LogInformation($"Validating identity claims [{claim}]");

            try {                
                var user = await _users.GetByEmail(claim.Email);
                var session = await _sessions.Retrieve(user);

                if (session.IsExpired()) {
                    await _sessions.Clear(user);
                    throw new System.Exception();
                }

                if (!session.Claims.Equals(user) || user.Id.ToString() != claim.Id)
                    throw new System.Exception();

                if (session.Status.Equals(SessionStatus.Expired) || session.IsExpired())
                    throw new System.Exception();
                
                _logger.LogInformation($"Claims validated");

                return true;
            } catch {
                _logger.LogInformation($"Invalid identity claims");
                throw new System.Exception("Your session has expired. Please login again.");
            }
        }
    }
}