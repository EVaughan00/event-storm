using System;
using System.Collections.Generic;
using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Server.Domain
{
    public class Tools : Entity
    {
        [BsonElement("EventStormId")]
        public ObjectId EventStormId { get; private set;}

        [BsonElement("ModelRepositoryId")]
        public ObjectId ModelRepositoryId { get; private set;}

        [BsonElement("TaskStackId")]
        public ObjectId TaskStackId { get; private set;}

        [BsonIgnore]
        public EventStorm EventStorm { get; private set;}

        [BsonIgnore]
        public ModelRepository ModelRepository { get; private set;}

        [BsonIgnore]
        public TaskStack TaskStack { get; private set;}  
        public void Add(Tool tool) {

            if (tool is EventStorm) 
                SetEventStorm(tool);
            
            if (tool is ModelRepository) 
                SetModelRepository(tool);
            
            if (tool is TaskStack) 
                SetTaskStack(tool);
        }

        public void SetEventStorm(Tool tool) {
            EventStorm = (EventStorm)tool;
            EventStormId = tool.Id;
        }

        public void SetModelRepository(Tool tool) {
            ModelRepository = (ModelRepository)tool;
            ModelRepositoryId = tool.Id;
        }

        public void SetTaskStack(Tool tool) {
            TaskStack = (TaskStack)tool;
            TaskStackId = tool.Id;
        }
    }
}