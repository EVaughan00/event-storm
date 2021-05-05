using System.Threading;
using System.Threading.Tasks;
using System;
using BuildingBlocks.Events;
using Server.Domain;
using Server.Infrastructure;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.SignalR;
using MassTransit;

namespace Server.API.Commands
{
    using Models;
    using Notifications;

    public class CreateUserCommand : Command<bool> 
    { 
        public Registration Registration { get; set; }
    }

    public class CreateUserCommandHandler : CommandHandler<CreateUserCommand, bool> 
    {
        private readonly ILogger<CreateUserCommandHandler> _logger;
        private readonly MediatR.IMediator _mediator;
        private readonly IBusControl _eventBus;
        private readonly IUserRepository _users;

        public CreateUserCommandHandler(
            ILogger<CreateUserCommandHandler> logger,
            MediatR.IMediator mediator,
            IBusControl eventBus,
            IUserRepository users)
        {
            _logger = logger;
            _eventBus = eventBus;
            _mediator = mediator;
            _users = users;
        }

        public override async Task<bool> HandleEvent(CreateUserCommand command, CancellationToken token)
        {
            var user = new User(
                command.Registration.FirstName, 
                command.Registration.LastName, 
                command.Registration.Email
            );

            _logger.LogInformation(user.Email.ToString());

            try {
                user.SetPassword(command.Registration.Password, new PasswordRequirements {
                    MinLength = 8,
                    Uppercase = true,
                    Lowercase = true,
                    Numeric = true
                });
            } catch (Exception ex) {
                throw new ApiException(ex.Message).AddError("password", ex.Message);
            }

            await _users.Create(user);

            user = await _users.GetByEmail(user.Email.Address);
            _logger.LogInformation($"User [{command.Registration.Email}] successfully registered");

           return await _mediator.Send(new AuthenticateUserCommand {
                Authenticated = true,
                User = user
            }, token);
        }

    }    
}