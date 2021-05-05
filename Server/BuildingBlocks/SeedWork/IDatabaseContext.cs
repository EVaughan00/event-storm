using System.Collections.Generic;

namespace BuildingBlocks.SeedWork
{
    // Marker interface
    public interface IDatabaseContext { 
        IDbCollection<T> GetCollection<T>(string collectionName) 
            where T: Entity, IAggregateRoot;
    }

    public class DatabaseContext : IDatabaseContext {
        public DatabaseContext() {
            _collections = new Dictionary<string, object>();
        }

        private Dictionary<string, object> _collections { get; set; }

        public IDbCollection<T> GetCollection<T>(string collectionName) 
            where T: Entity, IAggregateRoot 
        {
            object collection;
            _collections.TryGetValue(collectionName, out collection);

            var instance = (LocalDBCollection<T>) collection;

            if (instance != null)
                return instance;

            instance = new LocalDBCollection<T>();
            _collections.Add(collectionName, instance);

            return instance;
        }
     }
    
}