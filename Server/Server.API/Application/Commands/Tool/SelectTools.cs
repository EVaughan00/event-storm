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

    public class SelectToolsCommand : Command<bool> 
    { 
        public string SolutionId;
        public SelectedTools SelectedTools;
    }

    public class SelectToolsCommandHandler : CommandHandler<SelectToolsCommand, bool> 
    {
        private readonly ILogger<SelectToolsCommandHandler> _logger;
        private readonly MediatR.IMediator _mediator;
        private readonly ISolutionRepository _solutions;
        private readonly IToolboxService _toolboxService;

        public SelectToolsCommandHandler(
            ILogger<SelectToolsCommandHandler> logger,
            MediatR.IMediator mediator,
            ISolutionRepository solutions,
            IToolboxService toolboxService
            )
        {
            _logger = logger;
            _mediator = mediator;
            _solutions = solutions;
            _toolboxService = toolboxService;
        }

        public override async Task<bool> HandleEvent(SelectToolsCommand command, CancellationToken token)
        {
            var solution = await _solutions.GetById(command.SolutionId);

            Tools tools = DeveloperToolbox.Tools;

            tools = await _toolboxService.Select(tools, command.SelectedTools);

            solution.UseTools(tools);

            await _toolboxService.Create(tools);
            await _solutions.Update(solution);

            return true;
        }
    }    
}