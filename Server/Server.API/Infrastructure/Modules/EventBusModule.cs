using Autofac;
using MassTransit;
using System;
using Microsoft.Extensions.Options;
using Server.Config;

namespace Server.API.Infrastructure
{

    public class EventBusModule : Autofac.Module 
    {
        public EventBusModule() {}

        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(context => {
                var settings = context.Resolve<IOptions<EventBusSettings>>().Value;
                
                var bus = Bus.Factory.CreateUsingRabbitMq(busConfig => {
                    var connection = new Uri(settings.Connection);

                    var host = busConfig.Host(connection, hostConfig => {
                        hostConfig.Username(settings.UserName);
                        hostConfig.Password(settings.Password);
                    });

                    busConfig.ReceiveEndpoint(settings.Definition, endpoint => {
                        endpoint.ConfigureConsumers(context);
                    });
                });

                return bus;
            })
            .SingleInstance()
            .As<IBusControl>()
            .As<IBus>();
        }
    }
}