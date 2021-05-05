using BuildingBlocks.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson.Serialization.Attributes;

namespace Server.Domain
{
    public class PasswordRequirements 
    {
        public int MinLength = 0;
        public bool Uppercase = false;
        public bool Lowercase = false;
        public bool Numeric = false;
        public bool Special = false;
    }

    public class Password : ValueObject
    {
        [BsonElement("Hash")]        
        public byte[] Hash;

        [BsonElement("Salt")]        
        public byte[] Salt;

        [BsonElement("UpdatedAt")]
        public DateTime UpdatedAt { get; private set; }

        public Password(byte[] hash, byte[] salt)
        {
            if (Hash.Length != 64 || Salt.Length != 128)
                throw new ServerDomainException("Password could not be created from hash & salt");

            Hash = hash;
            Salt = salt;
        }

        public Password(string password)
        {
            Create(password);
        }

        public Password(string password, PasswordRequirements requirements)
        {
            if (Password.MeetsRequirements(password, requirements))
                Create(password);
        }

        private void Create(string password) 
        {            
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                Salt = hmac.Key;
                Hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            UpdatedAt = DateTime.Now;
        }

        public static bool MeetsRequirements(string password, PasswordRequirements requirements)
        {
            if (password.Length < requirements.MinLength)
                throw new ServerDomainException($"Password must be greater than {requirements.MinLength} characters");

            if (requirements.Uppercase && !password.Any(char.IsUpper))
                throw new ServerDomainException($"Password must contain uppercase letters");

            if (requirements.Lowercase && !password.Any(char.IsLower))
                throw new ServerDomainException($"Password must contain lowercase letters");

            if (requirements.Numeric && !password.Any(char.IsDigit))
                throw new ServerDomainException($"Password must contain numbers");

            if (requirements.Special && !password.Any(ch => !char.IsLetterOrDigit(ch)))
                throw new ServerDomainException($"Password must contain special characters");

            return true;
        }

        public bool Equals(string password) 
        {           
            if (string.IsNullOrWhiteSpace(password) || Hash.Length != 64 || Salt.Length != 128)
                return false;
 
            using (var hmac = new System.Security.Cryptography.HMACSHA512(Salt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != Hash[i]) 
                        return false;
                }
            }
 
            return true;
        }

        protected override IEnumerable<object> GetAtomicValues()
        {   
            yield return Salt;
            yield return Hash;
        }
    }
}