using MassTransit;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;
using System.Threading;

namespace Server.BackgroundTasks
{

    public class LifeTime : IHostedService
    {
        private readonly ILogger<LifeTime> _logger;
        private readonly IHostApplicationLifetime _appLifetime;
        private readonly IBusControl _eventBus;

        public LifeTime(
            ILogger<LifeTime> logger, 
            IHostApplicationLifetime appLifetime,            
            IBusControl eventBus
        ) {
            _appLifetime = appLifetime;
            _eventBus = eventBus;
            _logger = logger;
        }

        public Task StartAsync(CancellationToken token)
        {
            _logger.LogInformation("Starting event bus connection...");
            _eventBus.StartAsync();

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken token)
        {
            _logger.LogInformation("Stopping event bus connection...");
            _eventBus.StopAsync();

            return Task.CompletedTask;
        }
    }    
}