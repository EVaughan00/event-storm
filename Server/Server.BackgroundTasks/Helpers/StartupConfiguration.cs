using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using MassTransit;
using System;
using Server.Config;
using BuildingBlocks.SeedWork;

namespace Server.BackgroundTasks.Helpers
{

    public static class StartupConfiguration 
    {
        public static IServiceCollection AddCustomConfiguration(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<AppSettings>(config.GetSection("Application"));
            services.Configure<BackgroundTaskSettings>(config.GetSection("BackgroundTasks"));
            services.Configure<EventBusSettings>(config.GetSection("EventBus"));
            services.Configure<SerilogSettings>(config.GetSection("Serilog"));
            services.Configure<MongoDBSettings>(config.GetSection("MongoDB"));
            services.Configure<ServiceConnectionSettings>(config.GetSection("Services"));        
            services.Configure<ElkSettings>(config.GetSection("ElkStack"));    

            return services;
        }

        public static IServiceCollection AddHealthChecks(this IServiceCollection services, IConfiguration config)
        {
            var hcBuilder = services.AddHealthChecks();

            hcBuilder.AddCheck("self", () => HealthCheckResult.Healthy());            
            hcBuilder.AddRabbitMQ(
                $"{config["EventBus:Connection"]}",
                name: "orderingtask-rabbitmqbus-check",
                tags: new string[] { "rabbitmqbus" });

            return services;
        }
        public static IServiceCollection AddDatabase<TDatabase>(this IServiceCollection services)
            where TDatabase : class, IDatabaseContext
        {            
            services.AddTransient<IDatabaseContext, TDatabase>();

            return services;
        }

        public static IServiceCollection AddEventBus(this IServiceCollection services, IConfiguration config)
        {
            var connection = config["EventBus:Connection"];
            var userName = config["EventBus:UserName"];
            var password = config["EventBus:Password"];

            var bus = Bus.Factory.CreateUsingRabbitMq(sbc => { 
                var host = sbc.Host(new Uri(connection), h => {
                    h.Username(userName);
                    h.Password(password);
                });
            });

            services.AddSingleton<IBusControl>(bus);

            return services;           
        }
    }    
}