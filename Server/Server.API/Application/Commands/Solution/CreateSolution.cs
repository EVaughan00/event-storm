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

    public class CreateSolutionCommand : Command<bool> 
    { 
        public string Name { get; set; }
    }

    public class CreateSolutionCommandHandler : CommandHandler<CreateSolutionCommand, bool> 
    {
        private readonly ILogger<CreateSolutionCommandHandler> _logger;
        private readonly MediatR.IMediator _mediator;
        private readonly SolutionFactory _solutionFactory;

        public CreateSolutionCommandHandler(
            ILogger<CreateSolutionCommandHandler> logger,
            MediatR.IMediator mediator,
            SolutionFactory solutionFactory
            )
        {
            _logger = logger;
            _mediator = mediator;
            _solutionFactory = solutionFactory;
        }

        public override async Task<bool> HandleEvent(CreateSolutionCommand command, CancellationToken token)
        {
            await Task.CompletedTask;

            var solution = _solutionFactory.CreateSolution(command.Name);

            if (solution == null)
                return false;

            _logger.LogInformation("Solution: " + solution.Name + " successfully created");

            return true;
        }

    }    
}