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
    using System.Collections.Generic;

    [Route("solution")]
    [ApiController]
    public class SolutionController: Controller 
    {
        private readonly ILogger<SolutionController> _logger;
        private readonly IMediator _mediator;
        private readonly IUserQueries _userQueries;
        private readonly ISolutionQueries _solutionQueries;

        public SolutionController(
            ILogger<SolutionController> logger,
            IMediator mediator,
            IUserQueries userQueries,
            ISolutionQueries solutionQueries
        ) { 
            _logger = logger;
            _mediator = mediator;
            _userQueries = userQueries;
            _solutionQueries = solutionQueries;
        }

        [AuthorizeIdentity]
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

        [HttpGet("list")]
        [AuthorizeIdentity]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(List<SolutionDTO>), (int) HttpStatusCode.OK)]
        public async Task<IActionResult> List()
        {
            return await this.ApiAction(async () => {

                var claim = Request.GetIdentityClaims();
                var user = await _userQueries.GetDetails(claim);

                var solutions = _solutionQueries.GetList(user);

                return Ok(solutions);
            });
        }
    }
}