using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Server.Domain
{
    public class DifferenceSummary<T> where T : IsQuantifiable
    {
        private TimeSpan _timeDelta;

        public DifferenceSummary(Metrics<T> current, Metrics<T> previous) {

            _timeDelta = current.TimeAlive().Subtract(previous.TimeAlive());

        }
    }
}