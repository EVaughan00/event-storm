using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System;
using MongoDB.Bson;

namespace BuildingBlocks.SeedWork
{

    public class LocalDBCollection<T> : IDbCollection<T> where T: Entity, IAggregateRoot 
    {
        private List<T> _collection;
        private readonly IMediator _mediator;

        
        public void AddMediator(IMediator mediator) {}

        public LocalDBCollection() 
        { 
            _collection = new List<T>();
        }

        public LocalDBCollection(IMediator mediator)
        { 
            _mediator = mediator;
            _collection = new List<T>();
        }     
        
        public long Size { get { return _collection.Count; } }

        public bool IsUnique(Func<T, bool> filter) {
            var isUnique = true;

            _collection.ForEach(item => {
                if (filter(item))
                    isUnique = false;
            });

            return isUnique;
        }

        public T FindById(string id) 
        {
            var objId = new ObjectId(id);

            return _collection.Find(item => item.Id == objId);
        }

        public T FindOne(T Item)
        {
            return _collection.Find(item => item.Id == Item.Id);
        }

        public List<T> FindOne(List<ObjectId> Ids)
        {            
            var list = new List<T>();

            Ids.ForEach(Id => {
                list.Add(_collection.Find(item => item.Id == Id));
            });

            return list;
        }

        public List<T> FindAll() {
            return _collection.Select(t => t).ToList();
        }

        public T FindOne(ObjectId id) => FindById(id.ToString());

        public T FindOne(Expression<Func<T, bool>> expression)
        {            
            Func<T, bool> callback = expression.Compile();
            return _collection.Find(i => callback(i));
        }

        public List<T> FindList(Expression<Func<T, bool>> expression) { 
            var list = new List<T>();
            Func<T, bool> callback = expression.Compile();

            _collection.ForEach(item => {
                if (callback(item))
                    list.Add(item);
            });

            return list;
        }

        public void InsertOne(T item) => _collection.Add(item);

        public void UpdateOne(T update) 
        {
            var index = _collection.FindIndex(item => item.Id == update.Id);

            if (index != -1)
                _collection[index] = update;    
        }

        public void DeleteOne(Expression<Func<T, bool>> expression) 
        {
            Func<T, bool> callback = expression.Compile();
            var index = _collection.FindIndex(i => callback(i));

            if (index != -1)
                _collection.RemoveAt(index);
        }

        public void DeleteOne(ObjectId id) 
        {
            var index = _collection.FindIndex(i => i.Id == id);

            if (index != -1)
                _collection.RemoveAt(index);
        }

        public void DeleteOne(T deletion) => DeleteOne(deletion.Id);

        public void DeleteMany(Expression<Func<T, bool>> expression)        
        {
            Func<T, bool> callback = expression.Compile();
            _collection.RemoveAll(i => callback(i));
        }

        public void Swap(ObjectId id, ObjectId swapId)
        {   
            var index = _collection.FindIndex(i => i.Id == id);
            var swapIndex = _collection.FindIndex(i => i.Id == swapId);

            if (index != -1 && swapIndex != -1)
            {
                var swap = _collection[swapIndex];

                _collection[swapIndex] = _collection[index];
                _collection[index] = swap;
            }
        }

        public void Swap(T entity, T swapEntity) => Swap(entity.Id, swapEntity.Id);
    }  
}