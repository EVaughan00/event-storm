using System;

namespace Server.Infrastructure
{
    public class ServerInfrastructureException : Exception
    {
        public ServerInfrastructureException() {}

        public ServerInfrastructureException(string message): base(message) {}

        public ServerInfrastructureException(string message, Exception e): base(message, e) {}
    } 
}