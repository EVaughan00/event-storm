using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Server.Domain;
using Server.Config;
using System.Threading;
using System.Threading.Tasks;

namespace Server.BackgroundTasks.Tasks
{
    public class ClearExpiredPasswordResetsTask : BackgroundService
    {
        private readonly BackgroundTaskSettings _taskSettings;
        private readonly ILogger<ClearExpiredPasswordResetsTask> _logger;
        private readonly IPasswordResetRepository _passwordResets;

        public ClearExpiredPasswordResetsTask(
            IOptions<BackgroundTaskSettings> taskSettings,
            ILogger<ClearExpiredPasswordResetsTask> logger,
            IPasswordResetRepository passwordResets)
        {
            _taskSettings = taskSettings.Value;
            _logger = logger;
            _passwordResets = passwordResets;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await _passwordResets.ClearExpired();
                await Task.Delay(_taskSettings.ClearExpiredPasswordResets, stoppingToken);
            }
        }
    }

}