using System;
using System.IO;
using System.Net;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Serilog; 

namespace Server.API
{
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
                var host = BuildWebHost(config, args);            

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

        public static IWebHost BuildWebHost(IConfiguration config, string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .CaptureStartupErrors(false)
                .ConfigureKestrel(options => {
                    var ports = GetDefinedPorts(config);
                    options.Listen(IPAddress.Any, ports.httpPort, listenOptions =>
                    {
                        listenOptions.Protocols = HttpProtocols.Http1AndHttp2;
                    });

                    // options.Listen(IPAddress.Any, ports.httpsPort, listenOptions =>
                    // {
                    //     listenOptions.Protocols =  HttpProtocols.Http1AndHttp2;
                    //     listenOptions.UseHttps();
                    // });
                    
                    options.Listen(IPAddress.Any, ports.grpcPort, listenOptions =>
                    {
                        listenOptions.Protocols = HttpProtocols.Http2;
                    });
                })
                .ConfigureAppConfiguration(c => c.AddConfiguration(config))
                .UseStartup<Startup>()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseSerilog()
                .Build();

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
                .AddCommandLine(args)
                .AddEnvironmentVariables();

            return builder.Build(); 
        }

        private static (int httpPort, int httpsPort, int grpcPort) GetDefinedPorts(IConfiguration config)
        {
            var httpPort = config.GetSection($"Services:{ServiceName}:Http"); 
            var httpsPort = config.GetSection($"Services:{ServiceName}:Https");
            var grpcPort = config.GetSection($"Services:{ServiceName}:Grpc");
 
            var http = config.GetValue("PORT", int.Parse(httpPort.Value)); 
            var https = config.GetValue("HTTPS_PORT", int.Parse(httpsPort.Value));
            var grpc = config.GetValue("GRPC_PORT", int.Parse(grpcPort.Value));

            return (http, https, grpc);
        }
    }
}
