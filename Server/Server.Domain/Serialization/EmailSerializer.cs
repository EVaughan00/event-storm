using MongoDB.Bson.Serialization;
using MongoDB.Bson;
using System.Net.Mail;
using System;

namespace Server.Domain
{
    public class EmailSerializer : IBsonSerializer<MailAddress>
    {
        public Type ValueType => typeof(MailAddress);
 
        public MailAddress Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
        {
            var value = context.Reader.ReadString();

            return new MailAddress(value);
        }
 
        public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, MailAddress value)
        {
            context.Writer.WriteString(value.Address);
        }
 
        public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, object value)
        {
            if (value is MailAddress email)
            {
                context.Writer.WriteString(email.Address);
            }
            else
            {
                throw new NotSupportedException($"{value} is not an email");
            }
        }
 
        object IBsonSerializer.Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
        {
            var value = context.Reader.ReadString();
            return new MailAddress(value);
        }
    }
    
}
