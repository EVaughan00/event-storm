using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Serilog;
using System.IO;
using BuildingBlocks.SeedWork;
using Server.Infrastructure;
using Server.Domain;

namespace Server.BackgroundTasks
{
    using Helpers;
    using Tasks;

    public class Program
    {
        public static readonly string AppName = typeof(Program).Assembly.GetName().Name;
        public static readonly string ServiceName = AppName.Split(".")[0];

        public static int Main(string[] args)
        {
            var config = GetConfiguration(args);
            Log.Logger = CreateSerilogLogger(config);

            try {
                Log.Information("Configuring service ({ApplicationContext})...", AppName);
                var host = CreateHostBuilder(config, args);            

                Log.Information("Starting service ({ApplicationContext})...", AppName);
                host.Run();
                return 0;
            } catch (Exception ex) {
                Log.Fatal(ex, "Service terminated unexpectedly ({ApplicationContext})!", AppName);
                return 1;
            } finally { 
                Log.CloseAndFlush();
            }
        }

        public static IHost CreateHostBuilder(IConfiguration config, string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(c => c.AddConfiguration(config))  
                .ConfigureServices((context, services) => services
                    .AddOptions()
                    .AddHealthChecks(config)
                    .AddCustomConfiguration(config)
                    .AddEventBus(config)
                    .AddDatabase<MongoDbContext>()
                    .AddTransient<ISessionRepository, SessionRepository>()
                    .AddTransient<IPasswordResetRepository, PasswordResetRepository>()
                    .AddHostedService<ClearExpiredSessionsTask>()
                    .AddHostedService<ClearExpiredPasswordResetsTask>()
                    .AddHostedService<LifeTime>())
                .ConfigureLogging((host, builder) => 
                    builder.AddSerilog(CreateSerilogLogger(config)))
                .Build();

        public static IConfiguration GetConfiguration(string[] args) 
        {
            var path = Directory.GetCurrentDirectory();
            var settings = Path.Combine(path, "..", "Server.Config", "settings");
            var connections = Path.Combine(settings, "connectionSettings.json"); 
            var appSettings = Path.Combine(settings, "appSettings.json"); 

            var builder = new ConfigurationBuilder()
                .SetBasePath(path)
                .AddJsonFile(connections, optional: true, reloadOnChange: true)  
                .AddJsonFile(appSettings, optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .AddCommandLine(args);

            return builder.Build();
        } 

        public static Serilog.ILogger CreateSerilogLogger(IConfiguration config) 
        {
            var logstashUrl = config["ElkStack:Logstash"];
 
            if (string.IsNullOrWhiteSpace(logstashUrl)) 
                logstashUrl = "http://logstash:8080";

            return new LoggerConfiguration()
                .MinimumLevel.Information()
                .Enrich.WithProperty("ApplicationContext", AppName)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .WriteTo.File("log.txt") 
                .WriteTo.Http(logstashUrl)
                .ReadFrom.Configuration(config)
                .CreateLogger();
        }
    }
}
