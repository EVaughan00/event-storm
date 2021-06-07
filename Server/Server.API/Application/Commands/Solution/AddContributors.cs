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
    using System.Collections.Generic;
    using Models;
    using Notifications;
    using Server.API.Services;

    public class AddContributorCommand : Command<bool> 
    { 
        public ContributorDTO Contributor;
    }

    public class AddContributorCommandHandler : CommandHandler<AddContributorCommand, bool> 
    {
        private readonly ILogger<AddContributorCommandHandler> _logger;
        private readonly MediatR.IMediator _mediator;
        private readonly ISolutionRepository _solutions;
        private readonly IUserRepository _users;

        public AddContributorCommandHandler(
            ILogger<AddContributorCommandHandler> logger,
            MediatR.IMediator mediator,
            ISolutionRepository solutions,
            IUserRepository users
            )
        {
            _logger = logger;
            _mediator = mediator;
            _solutions = solutions;
            _users = users;
        }

        public override async Task<bool> HandleEvent(AddContributorCommand command, CancellationToken token)
        {

            var contributor = await _users.GetByEmail(command.Contributor.Email);

            // TODO: Send Contributor Request to user

            return true;
        }
    }    
}