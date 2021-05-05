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

    [Route("account")]
    [ApiController]
    public class AccountController: Controller 
    {
        private readonly ILogger<AccountController> _logger;
        private readonly IUserQueries _userQueries;
        private readonly IMediator _mediator;

        public AccountController(
            ILogger<AccountController> logger,
            IUserQueries userQueries,
            IMediator mediator
        ) { 
            _logger = logger;
            _userQueries = userQueries;
            _mediator = mediator;
        }

        [HttpGet("details")]
        [AuthorizeIdentity]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(UserDetails), (int) HttpStatusCode.OK)]
        public async Task<IActionResult> Details()
        {
            return await this.ApiAction(async () => {
                var claim = Request.GetIdentityClaims();
                var user = await _userQueries.GetDetails(claim);

                return Ok(user);
            });
        }

        [AllowAnonymous]
        [HttpPut("register")]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        public async Task<IActionResult> Register(Registration registration)
        {
            _logger.LogInformation(registration.Email);
            
            return await this.ApiAction(async () => {
                await _mediator.Send(new CreateUserCommand {
                    Registration = registration
                });

                return Ok();
            });
        }     

        [AllowAnonymous]
        [HttpPost("login")]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        public async Task<IActionResult> Login(Login attempt)
        {
            return await this.ApiAction(async () => {        
                await _mediator.Send(new LoginUserCommand { 
                    Login = attempt
                });

                return Ok();
            });
        }   

        [AllowAnonymous]
        [HttpGet("logout")]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        public async Task<IActionResult> Logout()
        {
            return await this.ApiAction(async () => {                                 
                var claim = Request.GetIdentityClaims();

                await _mediator.Send(new LogoutUserCommand {
                    Email = claim.Email
                });

                return Ok();
            });
        }   

        [AuthorizeIdentity]
        [HttpPost("update")]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateDetails(UserDetails update)
        {
            return await this.ApiAction(async () => {                               
                var claim = Request.GetIdentityClaims();

                await _mediator.Send(new UpdateUserDetailsCommand {
                    UserEmail = claim.Email,
                    Update = update
                });

                return Ok();
            });
        }    

        [AuthorizeIdentity]
        [HttpDelete("delete")]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        public async Task<IActionResult> Delete()
        {
            return await this.ApiAction(async () => {                               
                var claim = Request.GetIdentityClaims();

                await _mediator.Send(new DeleteUserAccountCommand{ Email = claim.Email });

                return Ok();
            });
        }

    }
}