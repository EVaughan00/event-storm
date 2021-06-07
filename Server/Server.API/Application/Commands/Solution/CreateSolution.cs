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
    using Server.API.Services;

    public class CreateSolutionCommand : Command<bool>
    {
        public UserDetails User;
        public SolutionDTO SolutionDTO;
    }

    public class CreateSolutionCommandHandler : CommandHandler<CreateSolutionCommand, bool>
    {
        private readonly ILogger<CreateSolutionCommandHandler> _logger;
        private readonly MediatR.IMediator _mediator;
        private readonly ISolutionRepository _solutions;
        private readonly ITemplateRepository _templates;
        private readonly IUserRepository _users;

        public CreateSolutionCommandHandler(
            ILogger<CreateSolutionCommandHandler> logger,
            MediatR.IMediator mediator,
            ISolutionRepository solutions,
            ITemplateRepository templates,
            IUserRepository users

            )
        {
            _logger = logger;
            _mediator = mediator;
            _solutions = solutions;
            _templates = templates;
            _users = users;
        }

        public override async Task<bool> HandleEvent(CreateSolutionCommand command, CancellationToken token)
        {
            await Task.CompletedTask;

            Solution solution = new Solution();
            var owner = await _users.GetById(command.User.Id);

            try {
                solution.FromBlueprint(command.SolutionDTO.ToBlueprint());
                solution.AddOwner(owner);
            } catch(Exception e) {
                throw e;
            }

            try {
                _logger.LogInformation("HERE " + command.SolutionDTO.Contributors);
                foreach (ContributorDTO contributor in command.SolutionDTO.Contributors)
                    await _mediator.Send(new AddContributorCommand() {Contributor = contributor});

            } catch (Exception e) {
                throw e;
            }
            await _solutions.Create(solution);

            _logger.LogInformation("Solution: " + solution.Name + " successfully created");

            return true;
        }
    }
}