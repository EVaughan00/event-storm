using Autofac;
using MassTransit;

namespace Server.API.Infrastructure
{
    using IntegrationEvents;
    
    public class IntegrationEventsModule : Autofac.Module 
    {
        public IntegrationEventsModule() {}

        protected override void Load(ContainerBuilder builder)
        {
            builder.AddMassTransit(config => {                
                config.AddConsumersFromNamespaceContaining<ReferenceIntegrationEvent>();
            });
        }
    }
}