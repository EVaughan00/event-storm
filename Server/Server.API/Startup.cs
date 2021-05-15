using Autofac;
using Autofac.Extensions.DependencyInjection;
using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using BuildingBlocks.Events;
using BuildingBlocks.SeedWork;
using BuildingBlocks.Utils;
using Server.Domain;

namespace Server.API
{
    using Infrastructure;
    using Server.Infrastructure;
    using Services;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            Session.TimeSpan = TimeSpan.FromDays(2);
            PasswordReset.TimeSpan = TimeSpan.FromHours(2);
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public virtual IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddGrpc(options => options.EnableDetailedErrors = true); 

            services
                .AddCustomConfiguration(Configuration)
                .AddCustomSwagger(Configuration)
                .AddHealthChecks(Configuration)
                .AddDatabase<MongoDbContext>()
                .AddHostedService<LifeTime>()
                .AddSingleton<EventTracker>()
                .AddSingleton<IEmailSender, EmailSender>()
                .AddSingleton<SolutionFactory>()
                .AddNotifications()
                .AddCustomAuthentication(Configuration)                
                .AddCustomMvc();

            var container = new ContainerBuilder();

            container.Populate(services);
            container.RegisterModule(new EventBusModule());
            container.RegisterModule(new RepositoryModule());
            container.RegisterModule(new IntegrationEventsModule());
            container.RegisterModule(new MediatorModule());

            return new AutofacServiceProvider(container.Build());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory logger)
        {
            var pathBase = Configuration["PATH_BASE"];
            
            if (!string.IsNullOrEmpty(pathBase)) {
                logger.CreateLogger<Startup>().LogDebug("Using PATH BASE '{pathBase}'", pathBase);
                app.UsePathBase(pathBase);
            }

            app.UseCors();
            // app.UseHttpsRedirection();  
            app.UseSwagger().UseSwaggerUI(options => {
                var endpoint = $"{(!string.IsNullOrEmpty(pathBase) ? pathBase : string.Empty)}/swagger/v1/swagger.json";
                options.SwaggerEndpoint(endpoint, $"{Program.AppName} API");
            });            

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization(); 
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                GrpcServiceModule.MapEndpoints(endpoints);
                
                endpoints.MapHub<NotificationHub>("/notifications"); 
                endpoints.MapDefaultControllerRoute();
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/hc", new HealthCheckOptions {
                    Predicate = _ => true
                });
                endpoints.MapHealthChecks("/liveness", new HealthCheckOptions {                    
                    Predicate = r => r.Name.Contains("self")
                });
            });
        }
    }
}
