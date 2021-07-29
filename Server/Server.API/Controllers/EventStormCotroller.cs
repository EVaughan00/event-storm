using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Threading.Tasks;

namespace Server.API.Controllers 
{
    using Queries;
    using Models;
    using Server.API.Commands;

    [Route("event-storm")]
    [ApiController]
    public class EventStormController: Controller 
    {
        private readonly ILogger<EventStormController> _logger;
        private readonly IMediator _mediator;
        private readonly IUserQueries _userQueries;
        private readonly IEventStormQueries _eventStormQueries;

        public EventStormController(
            ILogger<EventStormController> logger,
            IMediator mediator,
            IUserQueries userQueries,
            IEventStormQueries solutionQueries
        ) { 
            _logger = logger;
            _mediator = mediator;
            _userQueries = userQueries;
            _eventStormQueries = solutionQueries;
        }

        [AuthorizeIdentity]
        [HttpPut("block/create")]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        public async Task<IActionResult> Create(EventBlockDTO dto)
        {
            return await this.ApiAction(async () => {    

                var claim = Request.GetIdentityClaims();
                var user = await _userQueries.GetDetails(claim);

                await _mediator.Send(new CreateEventBlockCommand {
                    User = user,
                    Dto = dto
                });

                return Ok();
            });
        }

        [HttpGet("block/{id}")]
        [AuthorizeIdentity]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(EventBlockDTO), (int) HttpStatusCode.OK)]
        public async Task<IActionResult> GetBlockById(string id)
        {
            return await this.ApiAction(async () => {

                var claim = Request.GetIdentityClaims();
                var user = await _userQueries.GetDetails(claim);

                var block = await _eventStormQueries.GetBlockById(id);

                return Ok(block);
            });
        }

        [HttpGet("grid/{solutionId}")]
        [AuthorizeIdentity]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(EventStormDTO), (int) HttpStatusCode.OK)]
        public async Task<IActionResult> GetBySolutionId(string solutionId)
        {
            return await this.ApiAction(async () => {

                var claim = Request.GetIdentityClaims();
                var user = await _userQueries.GetDetails(claim);

                var eventStorm = await _eventStormQueries.GetBySolutionId(solutionId);

                return Ok(eventStorm);
            });
        }

        [HttpDelete("grid/{id}")]
        [AuthorizeIdentity]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        public async Task<IActionResult> Delete(string id)
        {
            return await this.ApiAction(async () => {

               var claim = Request.GetIdentityClaims();
                var user = await _userQueries.GetDetails(claim);

                // await _mediator.Send(new DeleteEventStormCommand {
                //     User = user,
                //     EventStormId = id
                // });

                return Ok();
            });
        }
    }
}