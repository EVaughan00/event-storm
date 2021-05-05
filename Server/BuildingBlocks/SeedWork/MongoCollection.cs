using MediatR;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace BuildingBlocks.SeedWork
{   
    public class MongoCollection<T> : IDbCollection<T> where T: Entity, IAggregateRoot {
        private IMongoCollection<T> _collection;
        private IMediator _mediator;

        public MongoCollection(IMongoCollection<T> collection)
        { 
            _collection = collection;
        }

        public void AddMediator(IMediator mediator) 
        {
            _mediator = mediator; 
        }

        private void DispatchDomainEvents(T item) {
            if (_mediator == null || item.DomainEvents == null)
                return;

            item.DomainEvents.ToList().ForEach(e => _mediator.Publish(e));
            item.ClearDomainEvents();
        }

        public long Size {
            get { 
                return _collection.CountDocuments(t => true);
            }
        }

        public bool IsUnique(Func<T, bool> filter) {
            var isUnique = true;

            FindAll().ForEach((T item) => {
                if (filter(item))
                    isUnique = false;
            });

            return isUnique;
        }

        public T FindById(string id) {
            return FindOne(new ObjectId(id));   
        }

        public T FindOne(T Item) {
            return FindOne(Item.Id);
        }

        public List<T> FindOne(List<ObjectId> Ids) {
            var list = new List<T>();

            Ids.ForEach(Id => {
                list.Add(_collection.Find(item => item.Id == Id).FirstOrDefault());
            });

            return list;
        }

        public List<T> FindAll() {
            return _collection.Find(item => true).ToList();
        }

        public T FindOne(ObjectId id) {
            return _collection.Find(Item => Item.Id == id).FirstOrDefault();
        }

        public T FindOne(Expression<Func<T, bool>> callback) {
            return _collection.Find(callback).FirstOrDefault();     
        }

        public List<T> FindList(Expression<Func<T, bool>> callback) {
            return  _collection.Find(callback).ToList();     
        }

        public void InsertOne(T item) {
            DispatchDomainEvents(item);
            _collection.InsertOne(item);
        }

        public void UpdateOne(T update) {
            update.UpdatedAt = DateTime.Now;
            DispatchDomainEvents(update);
            _collection.ReplaceOne(item => item.Id == update.Id, update);
        }

        public void DeleteOne(Expression<Func<T, bool>> callback) {
            var item = _collection.Find(callback).FirstOrDefault();            
            if (item == null)
                throw new ApplicationException();

            DeleteOne(item);
        }

        public void DeleteOne(ObjectId id) {
            FindOne(id);
            _collection.DeleteOne(item => item.Id == id);
        }

        public void DeleteOne(T deletion) {
            FindOne(deletion);
            DeleteOne(deletion.Id);
        }

        public void DeleteMany(Expression<Func<T, bool>> callback) {
            _collection.DeleteMany(callback);
        }

        public void Swap(ObjectId id, ObjectId swapId) {
            var current = FindOne(id);
            var next = FindOne(swapId);

            var swap = next.Id;
            next.Id = current.Id;
            current.Id = swap;            

            _collection.ReplaceOne(Item => Item.Id == current.Id, current);
            _collection.ReplaceOne(Item => Item.Id == next.Id, next);
        }

        public void Swap(T entity, T swapEntity) {
            DispatchDomainEvents(entity);
            DispatchDomainEvents(swapEntity);
            Swap(entity.Id, swapEntity.Id);
        }

    }
}