using System.Collections.Generic;
using BuildingBlocks.SeedWork;
using MongoDB.Bson;

namespace Server.Domain
{
    public class TaskStack : Tool, IsQuantifiable
    {
        public TaskStack() : base() {}

        public Count GetAggregateTotal()
        {
            throw new System.NotImplementedException();
        }

        public Count GetCompleted()
        {
            throw new System.NotImplementedException();
        }
    }
}