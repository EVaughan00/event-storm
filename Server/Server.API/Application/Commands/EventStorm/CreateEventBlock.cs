using System.Threading;
using System.Threading.Tasks;
using BuildingBlocks.Events;
using Server.Domain;
using Microsoft.Extensions.Logging;

namespace Server.API.Commands
{
    using Models;
    using Server.API.Notifications;

    public class CreateEventBlockCommand : Command<bool> 
    { 
        public UserDetails User;
        public EventBlockDTO Dto;
    }

    public class CreateEventBlockCommandHandler : CommandHandler<CreateEventBlockCommand, bool> 
    {
        private readonly ILogger<CreateEventBlockCommandHandler> _logger;
        private readonly MediatR.IMediator _mediator;
        private readonly ISolutionRepository _solutions;
        private readonly IEventBlockRepository _eventBlocks;
        private readonly IUserRepository _users;

        public CreateEventBlockCommandHandler(
            ILogger<CreateEventBlockCommandHandler> logger,
            MediatR.IMediator mediator,
            ISolutionRepository solutions,
            IEventBlockRepository eventBlocks,
            IUserRepository users
            )
        {
            _logger = logger;
            _mediator = mediator;
            _solutions = solutions;
            _eventBlocks = eventBlocks;
            _users = users;
        }

        public override async Task<bool> HandleEvent(CreateEventBlockCommand command, CancellationToken token)
        {

            var dto = command.Dto;
            Solution solution = null;
            EventBlock eventBlock = new EventBlock(dto.Name);

            try {
                solution = await _solutions.GetById(command.Dto.SolutionId);
            } catch {}
                
            if (solution == null)
                throw new ServerDomainException($"Failed to retrieve solution for this event block {command.Dto.Name}");
            
            eventBlock.AssignToSolution(solution);
            eventBlock.SetType(dto.Type);
            eventBlock.SetCoordinate(dto.Coordinate);

            await _eventBlocks.Create(eventBlock);

            return await NotifyUser(eventBlock.Id.ToString(), command.User);
        }

        public async Task<bool> NotifyUser(string blockId, UserDetails user) {            
            await _mediator.Publish(new EventBlockCreatedNotification {
                BlockId = blockId,
                User = user
            });

            return true;
        }
    }    
}