using Microsoft.Extensions.DependencyInjection;

namespace BuildingBlocks.Utils
{
    public static class NotificationServiceExtensions
    {
        
        public static IServiceCollection AddNotifications(this IServiceCollection services)
        {
            services.AddSignalR();
            services.AddSingleton<IConnectionManager, ConnectionManager>();
            services.AddSingleton<INotificationService, NotificationService>();

            return services;
        }
    }
}