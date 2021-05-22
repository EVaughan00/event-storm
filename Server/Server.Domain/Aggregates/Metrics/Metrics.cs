using System;
using System.Collections.Generic;
using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Server.Domain
{
    public class Metrics<T> : Entity, IAggregateRoot where T : IsQuantifiable
    {   
        [BsonElement("AggregateTotal")]
        public Count AggregateTotal { get; private set; }

        [BsonElement("CompletedTotal")]
        public Count CompletedTotal { get; private set; }       

        [BsonElement("PreviousId")]
        public ObjectId PreviousId { get; private set; }   

        [BsonElement("DifferenceSummary")]
        public DifferenceSummary<T> DifferenceSummary {get; private set;}
        public Metrics() {}
        public void Measure(T item) {
            AggregateTotal = item.GetAggregateTotal();
            CompletedTotal = item.GetCompleted();
        }
        public TimeSpan TimeAlive() {

            var difference = DateTime.Now.Subtract(this.CreatedAt);

            return difference;
        }
        public void CalculateDifference(Metrics<T> previous) {

            PreviousId = previous.Id;
            DifferenceSummary = new DifferenceSummary<T>(this, previous);

        }
    }
    public class MetricsId : ValueObject
    {
        private ObjectId _value;

        public MetricsId(ObjectId value) {
            _value = value;
        }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return _value;
        }
    }
}