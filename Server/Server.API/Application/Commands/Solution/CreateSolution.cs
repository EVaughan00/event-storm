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
        public SolutionBlueprint SolutionBlueprint;
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

            var owner = await _users.GetById(command.SolutionBlueprint.OwnerId);

            var templateId = command.SolutionBlueprint.TemplateId;

            Solution solution = new Solution(command.SolutionBlueprint.Name);

            if (!String.IsNullOrEmpty(templateId)) {
                Template template = await _templates.GetById(templateId);
                solution.FromTemplate(template);
            }

            solution.AddOwner(owner);
            
            await _solutions.Create(solution);

            try {
                await _mediator.Send(new SelectToolsCommand() {
                    SolutionId = solution.Id.ToString(),
                    SelectedTools = command.SolutionBlueprint.SelectedTools
                });
            } catch(Exception e) {
                await _solutions.Delete(solution);
                throw e;
            }

            _logger.LogInformation("Solution: " + solution.Name + " successfully created");

            return true;
        }
    }    
}