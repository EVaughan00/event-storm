using BuildingBlocks.SeedWork;
using System.Collections.Generic;
using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Server.Domain
{
    public class ResetCode : ValueObject
    {
        [BsonElement("Value")]
        public string Value { get; private set; }

        [BsonElement("GeneratedAt")]
        public DateTime GeneratedAt { get; private set; }

        public ResetCode(int length)
        {
            GenerateCode(length);
        }           

        public ResetCode(string code)
        {
            Value = code;
            GeneratedAt = DateTime.Now;
        }

        public void GenerateCode(int length) {
            Value = "";            

            var randomizer = new Random();
            for (int i = 0; i < length; i++) 
                Value += randomizer.Next(0, 9).ToString();

            GeneratedAt = DateTime.Now;
        }

        public bool Equals(string code) => code == Value;

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Value;
        }
    }
}