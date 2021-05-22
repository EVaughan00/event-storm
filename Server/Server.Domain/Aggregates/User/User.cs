using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using BuildingBlocks.SeedWork;
using System.Net.Mail;
using System.Collections.Generic;
using System;

namespace Server.Domain
{
    public class User: Entity, IAggregateRoot
    {
        [BsonElement("FirstName")]
        public string FirstName { get; private set; }

        [BsonElement("LastName")]
        public string LastName { get; private set; }

        [BsonElement("Email")]
        [BsonSerializer(typeof(EmailSerializer))]
        public MailAddress Email { get; private set; }

        [BsonElement("Password")]
        public Password Password { get; private set; }

        [BsonElement("Solutions")]
        public List<ObjectId> SolutionIds { get; private set;}

        [BsonElement("Templates")]
        public List<ObjectId> TemplateIds { get; private set;}

        [BsonIgnore]
        public FullName FullName { get; private set; }

        public User(string firstName, string lastName, string email)
        {
            SetName(firstName, lastName);
            Email = new MailAddress(email);
        }

        public void SetName(string first, string last)
        {
            FullName = new FullName(first, last);
            FirstName = first;
            LastName = last;
        }

        public void SetEmail(string email) {
            Email = new MailAddress(email.ToLower());

            AddDomainEvent(new UpdateSessionClaims {
                User = this
            });
        }

        public void SetPassword(string password)
        {
            Password = new Password(password);
        }

        public void SetPassword(string password, PasswordRequirements requirements)
        {
            if (Password.MeetsRequirements(password, requirements))
                SetPassword(password);
        }        

        public void SetPassword(Password password)
        {
            if (password != null && Password == null)
                Password = password;
        }

        public void AddSolution(Solution solution) {

            if (SolutionIds.FindIndex(id => id.Equals(solution.Id)) != -1)
                throw new ServerDomainException("Duplicate solution cannot be added");

            solution.AddOwner(this);

            SolutionIds.Add(solution.Id);
        }
        public void AssignSolution(Solution solution) {

            if (SolutionIds.FindIndex(id => id.Equals(solution.Id)) != -1)
                throw new ServerDomainException("Duplicate solution cannot be assigned");

            SolutionIds.Add(solution.Id);
        }
        public void AddTemplate(Template template) {
            if (TemplateIds.FindIndex(id => id.Equals(template.Id)) != -1)
                throw new ServerDomainException("Duplicate template cannot be added");

            TemplateIds.Add(template.Id);
        }

        public bool Equals(User user)
        {
            if (user.Id != Id || user.FullName != FullName)
                return false;

            return Email.Equals(user.Email);
        }

        public User Copy()
        {
            var user = new User(FirstName, LastName, Email.Address);
            user.Id = Id;
            user.SetPassword(Password);

            return user;
        }
    }

    public class UserId : ValueObject
    {
        private ObjectId _value;

        public UserId(ObjectId value) {
            _value = value;
        }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return _value;
        }
    }
}