using BuildingBlocks.SeedWork;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Server.Domain
{
    public class Solution : Entity, IAggregateRoot
    {
        [BsonElement("Reference")]
        public Guid Reference { get; private set; }

        [BsonElement("Name")]
        public string Name { get; private set; }

        [BsonElement("Owner")]
        public UserReference Owner { get; private set; }

        [BsonElement("Description")]
        public string Description { get; private set; }

        [BsonElement("TempatedAs")]
        public List<string> TempatedAs { get; private set; }

        [BsonElement("FromTemplate")]
        public string FromTemplate { get; private set; }

        [BsonElement("EventStorm")]
        public SolutionAreaReference EventStorm { get; private set; }

        [BsonElement("TaskStack")]
        public SolutionAreaReference TaskStack { get; private set; }

        [BsonElement("ModelRepository")]
        public SolutionAreaReference ModelRepository { get; private set; }

        public Solution(string name) {
            Name = name;
            Reference = Guid.NewGuid();
        }

        public void AddOwner(User user) {
            if (Owner != null)
                throw new ServerDomainException("Solution owner already exists");

            Owner = new UserReference(user.Id);
        }

        public void AddEventStorm(EventStorm eventStorm) {
            EventStorm = new SolutionAreaReference(eventStorm.Reference);
        }
        public void AddTaskStack(TaskStack taskStack) {
            TaskStack = new SolutionAreaReference(taskStack.Reference);
        }
        public void AddTaskStack(ModelRepository modelRepository) {
            ModelRepository = new SolutionAreaReference(modelRepository.Reference);
        }
    }
}