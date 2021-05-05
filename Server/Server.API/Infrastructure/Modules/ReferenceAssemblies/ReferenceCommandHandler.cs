using System;
using System.Threading;
using System.Threading.Tasks;
using BuildingBlocks.Events;

namespace Server.API.Commands
{
    public class ReferenceCommandHandler : CommandHandler<ReferenceCommand, bool> 
    {
        public ReferenceCommandHandler(EventTracker eventTracker) 
            : base(eventTracker) {}

        public override async Task<bool> HandleEvent(ReferenceCommand command, CancellationToken token)
        {
            await Task.CompletedTask;
            
            return false;
        }
    }
}