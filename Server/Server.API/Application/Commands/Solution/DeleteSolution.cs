using System.Threading;
using System.Threading.Tasks;
using System;
using BuildingBlocks.Events;
using Server.Domain;
using Microsoft.Extensions.Logging;


namespace Server.API.Commands
{
    using Models;
    using Server.Infrastructure.Utilities;

    public class DeleteSolutionCommand : Command<bool>
    {
        public UserDetails User;
        public string SolutionId;
    }

    public class DeleteSolutionCommandHandler : CommandHandler<DeleteSolutionCommand, bool>
    {
        private readonly ILogger<DeleteSolutionCommandHandler> _logger;
        private readonly MediatR.IMediator _mediator;
        private readonly ISolutionRepository _solutions;
        private readonly IUserRepository _users;

        public DeleteSolutionCommandHandler(
            ILogger<DeleteSolutionCommandHandler> logger,
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

        public override async Task<bool> HandleEvent(DeleteSolutionCommand command, CancellationToken token)
        {
            await Task.CompletedTask;

            var user = await _users.GetById(command.User.Id);
            var solution = await _solutions.GetById(command.SolutionId);

            if (!solution.ContributorIds.Contains(user.Id))
                throw new ServerDomainException("User is not a contributor to the solution");

            await _solutions.Delete(solution);

            _logger.LogInformation("Solution: " + solution.Name + " successfully deleted");

            return true;
        }
    }
}