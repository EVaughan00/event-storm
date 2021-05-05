using MassTransit;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Server.Domain;
using Server.Config;
using Server.Infrastructure.Events;
using System.Threading;
using System.Threading.Tasks;

namespace Server.BackgroundTasks.Tasks
{
    using Helpers;

    public class ClearExpiredSessionsTask : BackgroundService
    {
        private readonly BackgroundTaskSettings _taskSettings;
        private readonly ILogger<ClearExpiredSessionsTask> _logger;
        private readonly IBusControl _eventBus;
        private readonly ISessionRepository _sessions;

        public ClearExpiredSessionsTask(
            IBusControl eventBus,
            IOptions<BackgroundTaskSettings> taskSettings,
            ILogger<ClearExpiredSessionsTask> logger,
            ISessionRepository sessions)
        {
            _taskSettings = taskSettings.Value;
            _eventBus = eventBus;
            _logger = logger;
            _sessions = sessions;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var @event = new ExpiredSessionsIntegrationEvent();

                // Handle background tasks 
                var activeSessions = await _sessions.GetAll(SessionStatus.Active);

                activeSessions.ForEach(activeSession => {
                    if (!activeSession.IsExpired())
                        return;

                    activeSession.ChangeStatus(SessionStatus.Expired);
                    _sessions.Update(activeSession);

                    @event.Expirations.Add(new ExpiredSessionClaim {
                        SessionId = activeSession.Id.ToString(),
                        UserId = activeSession.Claims.UserId.ToString(),
                        Email = activeSession.Claims.Email
                    });
                });                

                await _sessions.ClearExpired(24);

                // Publish integration event if necessary
                if (@event.Expirations.Count > 0)
                    await _eventBus.Publish(@event);

                await Task.Delay(_taskSettings.ClearExpiredSessions, stoppingToken);
            }
        }
    }
}
