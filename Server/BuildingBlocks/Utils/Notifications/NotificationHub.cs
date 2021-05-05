using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System;

namespace BuildingBlocks.Utils
{
    public class NotificationHub : Hub {
        private IConnectionManager _manager;

        public NotificationHub(IConnectionManager manager)
        {
            _manager = manager;
        }

        private string GetUserId() {
            var userId = "";
            var request = Context.GetHttpContext().Request;

            // try {
            //     var claims = request.GetIdentityClaims();
            //     userId = claims.Id;
            // } catch {
                userId = request.Query["id"];
            // }

            return userId;
        }

        public async Task Identify(string userId) {
            _manager.AddConnection(userId, Context.ConnectionId);

            await Task.CompletedTask;
        }

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _manager.RemoveConnection(Context.ConnectionId);

            return base.OnDisconnectedAsync(exception);
        }
    }

}