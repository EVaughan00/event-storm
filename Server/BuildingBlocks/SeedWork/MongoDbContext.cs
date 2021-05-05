using Server.Config;
using MongoDB.Driver;
using System.Security.Authentication;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using MediatR;

namespace BuildingBlocks.SeedWork
{
    public class MongoDbContext : IDatabaseContext
    {
        private IMongoDatabase _database;
        private MongoClient _client;
        private IMediator _mediator;

        public MongoDbContext(IOptions<MongoDBSettings> _options) {     
            Initialize(_options.Value);
        }

        public MongoDbContext(IOptions<MongoDBSettings> _options, IMediator mediator) {    
            Initialize(_options.Value);
            _mediator = mediator;
        }

        private void Initialize(MongoDBSettings options) {
            var settings = MongoClientSettings.FromUrl(new MongoUrl(options.ConnectionString));

            settings.SslSettings = new SslSettings() { 
                EnabledSslProtocols = SslProtocols.Tls12
            };

            _client = new MongoClient(settings);                        
            _database = _client.GetDatabase(options.Database);
        }

        public IDbCollection<T> GetCollection<T>(string collectionName) 
            where T: Entity, IAggregateRoot
        {
            var mongoCollection = _database.GetCollection<T>(collectionName);
            var collection = new MongoCollection<T>(mongoCollection);

            if (_mediator != null)
                collection.AddMediator(_mediator);

            return collection;
        }
    }
}