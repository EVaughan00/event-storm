using MediatR;
using Microsoft.AspNetCore.SignalR;
using System.Threading;
using System.Threading.Tasks;
using Server.Domain;
using BuildingBlocks.Utils;
using Microsoft.AspNetCore.Http;
using Server.API.Models;

namespace Server.API.Notifications
{
    public class EventBlockCreatedNotification : INotification {
        public string BlockId { get; set; }
        public UserDetails User { get; set; }
    }   

    public class EventBlockCreatedNotificationHandler : INotificationHandler<EventBlockCreatedNotification>
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly INotificationService _notificationService;
        private readonly HttpContext _httpContext;

        public EventBlockCreatedNotificationHandler(
            IHubContext<NotificationHub> hubContext,
            IHttpContextAccessor httpContextAccessor,
            INotificationService notificationService)
        {
            _hubContext = hubContext;
            _notificationService = notificationService;
            _httpContext = httpContextAccessor.HttpContext;
        } 
        
        public async Task Handle(EventBlockCreatedNotification @event, CancellationToken cancellationToken)
        {
            var connectionId = _httpContext.Request.Headers["RequestId"].ToString();
            // System.Console.WriteLine("Sending block id to client");

            if (connectionId != null) {               
                // System.Console.WriteLine($"Client found: {connectionId}");    
               await _hubContext.Clients.All.SendAsync("blockCreated", @event.BlockId);
            }

            // if (@event.User != null) {
            //     await _notificationService.SendAsync(@event.User.Id.ToString(), "blockCreated", @event.BlockId);
            // }
        }
    }
}