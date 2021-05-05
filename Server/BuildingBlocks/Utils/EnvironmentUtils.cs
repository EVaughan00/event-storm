using System;

namespace BuildingBlocks.Utils
{
    public class EnvironmentUtils 
    {
        public static bool IsDevelopment()
        {            
            var envVariable = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            return envVariable == "Development";
        }
    }
}