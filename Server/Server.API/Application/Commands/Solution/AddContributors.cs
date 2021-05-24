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

    public class AddContributorsCommand : Command<bool> 
    { 
        public string SolutionId;
        public List<ContributorDTO> Contributors;
    }

    public class AddContributorsCommandHandler : CommandHandler<AddContributorsCommand, bool> 
    {
        private readonly ILogger<AddContributorsCommandHandler> _logger;
        private readonly MediatR.IMediator _mediator;
        private readonly ISolutionRepository _solutions;
        private readonly IUserRepository _users;

        public AddContributorsCommandHandler(
            ILogger<AddContributorsCommandHandler> logger,
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

        public override async Task<bool> HandleEvent(AddContributorsCommand command, CancellationToken token)
        {

            User user;
            Solution solution = await _solutions.GetById(command.SolutionId);

            foreach (ContributorDTO collaborator in command.Contributors) {
                user = await _users.GetByEmail(collaborator.Email);

                solution.AddContributor(user);

                _logger.LogInformation("Contributor: " + collaborator.Name + " successfully added to solution " + solution.Name);              
            }

            await _solutions.Update(solution);
            return true;
        }
    }    
}