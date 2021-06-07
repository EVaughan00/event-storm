using Microsoft.Extensions.Logging;
using Server.Domain;
using BuildingBlocks.SeedWork;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Server.Infrastructure
{
    public class MetricsSnapshotRepository : IMetricsSnapshotRepository
    {
        private ILogger<MetricsSnapshotRepository> _logger;
        private IDbCollection<MetricsSnapshot> _metricsSnapshots;
        public static string CollectionName = "MetricsSnapshots";

        public MetricsSnapshotRepository(ILoggerFactory logger, IDatabaseContext context)
        {
            _logger = logger.CreateLogger<MetricsSnapshotRepository>();
            _metricsSnapshots = context.GetCollection<MetricsSnapshot>(CollectionName);
        }

       public async Task Create(MetricsSnapshot metricSummary)
        {
           var existing = _metricsSnapshots.FindOne(u => u.Id.Equals(metricSummary.Id));

            if (existing != null) 
                throw new ServerInfrastructureException($"A metrics snapshot with id: \"{metricSummary.Id}\" already exists");

            await Task.CompletedTask;
            _metricsSnapshots.InsertOne(metricSummary);
        }

        public async Task<MetricsSnapshot> GetById(string id) 
        {
            var result = _metricsSnapshots.FindOne(u => u.Id == new ObjectId(id));

            if (result == null) 
                throw new ServerInfrastructureException($"No metrics snapshot with an id: \"{id}\" exists");

            await Task.CompletedTask;
            return result;
        }

        public async Task Update(MetricsSnapshot metricSummary)
        {
            var existing = _metricsSnapshots.FindOne(u => u.Id == metricSummary.Id);

            if (existing == null)
                throw new ServerInfrastructureException($"No metrics snapshot exists to update");

            await Task.CompletedTask;
            _metricsSnapshots.UpdateOne(metricSummary);
        }

        public async Task Delete(string id)
        {
            try {
                await Task.CompletedTask;
                _metricsSnapshots.DeleteOne(u => u.Id == new ObjectId(id));
            } catch {
                throw new ServerInfrastructureException($"No metrics snapshot with id: \"{id}\" exists to delete");
            }
        }
    }
}