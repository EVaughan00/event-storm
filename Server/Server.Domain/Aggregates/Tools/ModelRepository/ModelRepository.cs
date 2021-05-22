using System.Collections.Generic;
using BuildingBlocks.SeedWork;
using MongoDB.Bson;

namespace Server.Domain
{
    public class ModelRepository : Tool, IsQuantifiable
    {
        public ModelRepository() : base() {}

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