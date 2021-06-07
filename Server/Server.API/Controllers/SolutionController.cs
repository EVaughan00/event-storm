using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Net;
using System.Threading.Tasks;
using Server.Infrastructure;
using BuildingBlocks.Utils;

namespace Server.API.Controllers 
{
    using Queries;
    using Models;
    using Commands;
    using Notifications;

    [Route("solutions")]
    [ApiController]
    public class SolutionsController: Controller 
    {
        private readonly ILogger<SolutionsController> _logger;
        private readonly IMediator _mediator;
        private readonly IUserQueries _userQueries;

        public SolutionsController(
            ILogger<SolutionsController> logger,
            IMediator mediator,
            IUserQueries userQueries
        ) { 
            _logger = logger;
            _mediator = mediator;
            _userQueries = userQueries;
        }

        [AllowAnonymous]
        [HttpPut("create")]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        public async Task<IActionResult> Create(SolutionDTO blueprint)
        {
            return await this.ApiAction(async () => {    

                var claim = Request.GetIdentityClaims();
                var user = await _userQueries.GetDetails(claim);

                await _mediator.Send(new CreateSolutionCommand {
                    User = user,
                    SolutionDTO = blueprint
                });

                return Ok();
            });
        }
    }
}