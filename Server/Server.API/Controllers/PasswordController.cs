using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System.Net;
using System.Threading.Tasks;
using Server.Domain;

namespace Server.API.Controllers
{
    using Commands;
    using Models;
    using Queries;
    using Services;

    [Route("password")]
    [ApiController]
    public class PasswordController : Controller
    {        
        private readonly IUserQueries _userQueries;
        private readonly ILogger<AccountController> _logger;
        private readonly IMediator _mediator;
        private readonly IPasswordResetRepository _passwordResets;
        private readonly IEmailSender _emailSender;

        public PasswordController(
            IEmailSender emailSender,
            IUserQueries userQueries,
            ILogger<AccountController> logger, 
            IMediator mediator,
            IPasswordResetRepository passwordResets)
        {
            _emailSender = emailSender;
            _userQueries = userQueries;
            _logger = logger;
            _mediator = mediator;
            _passwordResets = passwordResets;
        }

        [AuthorizeIdentity]
        [HttpPost("update")]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        public async Task<IActionResult> UpdatePassword(PasswordUpdate update)
        {            
            return await this.ApiAction(async () => {    
                var claim = Request.GetIdentityClaims();

                await _mediator.Send(new UpdateUserPasswordCommand {
                    Email = claim.Email,
                    Update = update
                });

                return Ok();
            });
        }  

        [AllowAnonymous]
        [HttpPost("reset")]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        public async Task<IActionResult> RequestPasswordReset(PasswordResetRequest resetRequest)
        {   
            return await this.ApiAction(async () => {    
                var resetCode = await _mediator.Send(new RequestPasswordResetCommand {
                    Request = resetRequest
                });

                var messageBody = await this.RenderView("ResetEmail", 
                    new PasswordResetEmail {
                        Email = resetRequest.Email,
                        ResetCode = resetCode.Value
                    });

                var response = await _emailSender.Send(resetRequest.Email,
                    "NREL account password reset", messageBody);

                if (response.StatusCode != HttpStatusCode.Accepted)                     
                    return BadRequest(new { message = "Could not send reset code. Try again"});

                return Ok();      
            });
        }

        [AllowAnonymous]
        [HttpPost("verify")]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        public async Task<IActionResult> Verify(PasswordResetCode reset)
        {
            
            return await this.ApiAction(async () => {                    
                await _mediator.Send(new VerifyPasswordResetCommand {
                    Reset = reset
                });

                return Ok();
            });
        }  
 
    }

}