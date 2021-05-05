using MongoDB.Bson;
using System;
using System.Collections.Generic;
using MediatR;
using System.Linq.Expressions;

namespace BuildingBlocks.SeedWork
{    
    // Contract to enforce repositories are for aggregate roots only
    public interface IRepository<T> where T : IAggregateRoot
    {
        
    }

    public interface IDbCollection<T> where T : IAggregateRoot
    {
        void AddMediator(IMediator mediator);

        long Size { get; }

        bool IsUnique(Func<T, bool> filter);

        T FindById(string id);

        T FindOne(T Item);

        List<T> FindOne(List<ObjectId> Ids);

        List<T> FindAll();

        T FindOne(ObjectId id);

        T FindOne(Expression<Func<T, bool>> callback);

        List<T> FindList(Expression<Func<T, bool>> callback);

        void InsertOne(T item);

        void UpdateOne(T update);

        void DeleteOne(Expression<Func<T, bool>> callback);

        void DeleteOne(ObjectId id);

        void DeleteOne(T deletion);

        void DeleteMany(Expression<Func<T, bool>> callback);

        void Swap(ObjectId id, ObjectId swapId);

        void Swap(T entity, T swapEntity);
    }
}