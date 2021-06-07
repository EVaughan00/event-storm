using Autofac;
using Server.Infrastructure;
using Server.Domain;

namespace Server.API.Infrastructure
{
    using Queries;
    using Server.API.Services;

    public class ServiceModule : Autofac.Module 
    {
        public ServiceModule() {}

        protected override void Load(ContainerBuilder builder)
        {

        }
    }
}