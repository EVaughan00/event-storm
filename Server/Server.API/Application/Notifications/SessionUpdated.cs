using MediatR;
using Microsoft.AspNetCore.SignalR;
using System.Threading;
using System.Threading.Tasks;
using Server.Domain;
using BuildingBlocks.Utils;
using Microsoft.AspNetCore.Http;

namespace Server.API.Notifications
{
    public class SessionUpdatedNotification : INotification {
        public string SessionToken { get; set; }
        public User User { get; set; }
    }   

    public class SessionUpdatedNotificationHandler : INotificationHandler<SessionUpdatedNotification>
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly INotificationService _notificationService;
        private readonly HttpContext _httpContext;

        public SessionUpdatedNotificationHandler(
            IHubContext<NotificationHub> hubContext,
            IHttpContextAccessor httpContextAccessor,
            INotificationService notificationService)
        {
            _hubContext = hubContext;
            _notificationService = notificationService;
            _httpContext = httpContextAccessor.HttpContext;
        } 
        
        public async Task Handle(SessionUpdatedNotification @event, CancellationToken cancellationToken)
        {
            var connectionId = _httpContext.Request.Headers["RequestId"].ToString();
            System.Console.WriteLine("Sending session token to client");

            if (connectionId != null) {               
                System.Console.WriteLine($"Client found: {connectionId}");    
               await _hubContext.Clients.All.SendAsync("sessionToken", @event.SessionToken);
            }

            if (@event.User != null) {
                await _notificationService.SendAsync(@event.User.Id.ToString(), "sessionToken", @event.SessionToken);
            }
        }
    }
}