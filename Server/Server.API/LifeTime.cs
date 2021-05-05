using MassTransit;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System.Threading;
using Server.Config;

namespace Server.API
{

    public class LifeTime : IHostedService
    {
        private readonly ILogger<LifeTime> _logger;
        private readonly IHostApplicationLifetime _appLifetime;
        private readonly IBusControl _eventBus;
        private readonly EventBusSettings _busSettings;

        public LifeTime(
            IBusControl eventBus,
            IHostApplicationLifetime appLifetime,            
            ILogger<LifeTime> logger,
            IOptions<EventBusSettings> busSettings
        ) {
            _appLifetime = appLifetime;
            _busSettings = busSettings.Value;
            _eventBus = eventBus;
            _logger = logger;
        }

        public Task StartAsync(CancellationToken token)
        {
            _logger.LogInformation($"Starting event bus connection ({_busSettings.Connection})");
            _eventBus.StartAsync();

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken token)
        {
            _logger.LogInformation($"Stopping event bus connection ({_busSettings.Connection})");
            _eventBus.StopAsync();

            return Task.CompletedTask;
        }
    }    
}