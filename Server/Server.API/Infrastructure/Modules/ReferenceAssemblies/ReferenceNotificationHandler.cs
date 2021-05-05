using MediatR;
using Microsoft.AspNetCore.SignalR;
using System.Threading;
using System.Threading.Tasks;
using BuildingBlocks.Utils;

namespace Server.API.Notifications
{

    public class ReferenceNotificationHandler : INotificationHandler<ReferenceNotification>
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public ReferenceNotificationHandler(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }
        
        public Task Handle(ReferenceNotification @event, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}