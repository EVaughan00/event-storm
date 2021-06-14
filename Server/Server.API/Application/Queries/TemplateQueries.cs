using Server.Domain;
using Microsoft.Extensions.Logging;
using BuildingBlocks.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Server.API.Queries
{
    using Models;

    public class TemplateQueries : ITemplateQueries
    {
        private readonly ITemplateRepository _templates;
        private readonly ILogger<UserQueries> _logger;
        private readonly ISessionRepository _sessions;

        public TemplateQueries(
            ILogger<UserQueries> logger, 
            ISessionRepository sessionRepository, 
            ITemplateRepository templateRepository
        ) {
            _templates = templateRepository;
            _sessions = sessionRepository;
            _logger = logger;
        }

        public async Task<List<TemplateDTO>> GetList(UserDetails user) 
        {
            _logger.LogInformation($"Retrieving all templates for [{user.Email}]");

            var templates = await _templates.GetAllByOwnerId(user.Id.ToString());

            List<TemplateDTO> list = new List<TemplateDTO>();

            foreach (Template template in templates)
                list.Add(TemplateDTO.Map(template));

            return list;   
        }  
    }
}