using System;

namespace Server.Domain
{
    public class ServerDomainException : Exception
    {
        public ServerDomainException() {}

        public ServerDomainException(string message): base(message) {}

        public ServerDomainException(string message, Exception e): base(message, e) {}
    } 
}