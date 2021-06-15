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
    using Server.Infrastructure.Utilities;

    public class CreateTemplateCommand : Command<bool>
    {
        public UserDetails User;
        public TemplateDTO TemplateDTO;
    }

    public class CreateTemplateCommandHandler : CommandHandler<CreateTemplateCommand, bool>
    {
        private readonly ILogger<CreateTemplateCommandHandler> _logger;
        private readonly MediatR.IMediator _mediator;
        private readonly ITemplateRepository _templates;
        private readonly ISolutionRepository _solutions;
        private readonly IUserRepository _users;

        public CreateTemplateCommandHandler(
            ILogger<CreateTemplateCommandHandler> logger,
            MediatR.IMediator mediator,
            ITemplateRepository templates,
            ISolutionRepository solutions,
            IUserRepository users

            )
        {
            _logger = logger;
            _mediator = mediator;
            _templates = templates;
            _solutions = solutions;
            _users = users;
        }

        public override async Task<bool> HandleEvent(CreateTemplateCommand command, CancellationToken token)
        {
            await Task.CompletedTask;

            var owner = await _users.GetById(command.User.Id);
            var solution = await _solutions.GetById(command.TemplateDTO.SolutionId);

            Template template = TemplateUtility.CreateFromSolution(solution);
            
            if (!String.IsNullOrEmpty(command.TemplateDTO.Name))
                template.SetName(command.TemplateDTO.Name);

            if (!String.IsNullOrEmpty(command.TemplateDTO.Description))
                template.DefineFrom(new SolutionDefinition() {
                    Description = command.TemplateDTO.Description,
                    CodeBase = command.TemplateDTO.CodeBase
                });

            template.RememberTools(null);
            template.AddOwner(owner);

            await _templates.Create(template);

            _logger.LogInformation("Template: " + template.Name + " successfully created");

            return true;
        }
    }
}