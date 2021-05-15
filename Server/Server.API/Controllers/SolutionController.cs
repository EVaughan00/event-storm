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
    using Server.API.Application.Models.Solution;

    [Route("solutions")]
    [ApiController]
    public class SolutionsController: Controller 
    {
        private readonly ILogger<SolutionsController> _logger;
        private readonly IMediator _mediator;

        public SolutionsController(
            ILogger<SolutionsController> logger,
            IMediator mediator
        ) { 
            _logger = logger;
            _mediator = mediator;
        }

        [AllowAnonymous]
        [HttpPut("create")]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        public async Task<IActionResult> Create(CreateSolution solution)
        {
            return await this.ApiAction(async () => {        
                await _mediator.Send(new CreateSolutionCommand { 
                    Name = solution.Name
                });

                return Ok();
            });
        }
    }
}