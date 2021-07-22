using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Threading.Tasks;

namespace Server.API.Controllers 
{
    using Queries;
    using Models;


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
        public async Task<IActionResult> Create(EventStormDTO blueprint)
        {
            return await this.ApiAction(async () => {    

                var claim = Request.GetIdentityClaims();
                var user = await _userQueries.GetDetails(claim);

                // await _mediator.Send(new CreateEventStormCommand {
                //     User = user,
                //     EventStormDTO = blueprint
                // });

                return Ok();
            });
        }

        [HttpGet("{solutionId}")]
        [AuthorizeIdentity]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(EventStormDTO), (int) HttpStatusCode.OK)]
        public async Task<IActionResult> GetOneBySolutionId(string solutionId)
        {
            return await this.ApiAction(async () => {

                var claim = Request.GetIdentityClaims();
                var user = await _userQueries.GetDetails(claim);

                var eventStorm = await _eventStormQueries.GetOneBySolutionId(solutionId);

                return Ok(eventStorm);
            });
        }

        [HttpDelete("{id}")]
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