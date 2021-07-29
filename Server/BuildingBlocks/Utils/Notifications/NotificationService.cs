using System;  
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.SignalR;

namespace BuildingBlocks.Utils
{
    
    public class NotificationService : INotificationService
    {   
        private readonly ILogger<NotificationService> _logger;
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly IConnectionManager _connectionManager;

        public NotificationService(
            IHubContext<NotificationHub> hubContext,
            IConnectionManager connectionManager,
            ILogger<NotificationService> logger)
        {
            _connectionManager = connectionManager;
            _hubContext = hubContext; 
            _logger = logger;
        }

        public async Task SendAsync(string channel, object message) {
            await _hubContext.Clients.All.SendAsync(channel, message);
        }

        public async Task SendAsync(string userId, string channel, object message) {
            var connections = _connectionManager.GetConnections(userId);    

            if (connections == null || connections.Count == 0) {
                _logger.LogCritical($"Could not notify user [{userId}]: no live connections in notification hub");
                return;
            }

            foreach (var connection in connections) {
                try {
                    await _hubContext.Clients.Client(connection).SendAsync(channel, message);
                } catch (Exception ex) {   
                    _logger.LogCritical($"Could not notify {userId} [{userId}]: {ex.Message}");
                }
            }
        }
    }    
}