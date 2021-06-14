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

    [Route("template")]
    [ApiController]
    public class TemplateController: Controller 
    {
        private readonly ILogger<TemplateController> _logger;
        private readonly IMediator _mediator;
        private readonly IUserQueries _userQueries;
        private readonly ITemplateQueries _templateQueries;

        public TemplateController(
            ILogger<TemplateController> logger,
            IMediator mediator,
            IUserQueries userQueries,
            ITemplateQueries templateQueries
        ) { 
            _logger = logger;
            _mediator = mediator;
            _userQueries = userQueries;
            _templateQueries = templateQueries;
        }

        [AllowAnonymous]
        [HttpPut("create")]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        public async Task<IActionResult> Create(TemplateDTO template)
        {
            return await this.ApiAction(async () => {    

                var claim = Request.GetIdentityClaims();
                var user = await _userQueries.GetDetails(claim);

                await _mediator.Send(new CreateTemplateCommand() {
                    User = user,
                    TemplateDTO = template
                });

                return Ok();
            });
        }

        [HttpGet("list")]
        [AllowAnonymous]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(List<TemplateDTO>), (int) HttpStatusCode.OK)]
        public async Task<IActionResult> List()
        {
            return await this.ApiAction(async () => {

                var claim = Request.GetIdentityClaims();
                var user = await _userQueries.GetDetails(claim);

                var templates = _templateQueries.GetList(user);

                return Ok(templates);
            });
        }
    }
}