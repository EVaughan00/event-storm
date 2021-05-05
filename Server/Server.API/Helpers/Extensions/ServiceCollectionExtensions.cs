using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using Server.Config;
using Server.Infrastructure;
using BuildingBlocks.SeedWork;

namespace Server.API
{
    using Infrastructure;

    public static class ServiceCollectionExtensions 
    {
        public static IServiceCollection AddCustomConfiguration(this IServiceCollection services, IConfiguration config)
        {
            services.AddOptions();
            services.Configure<AppSettings>(config.GetSection("Application"));             
            services.Configure<SendGridSettings>(config.GetSection("SendGrid"));             
            services.Configure<MongoDBSettings>(config.GetSection("MongoDB"));            
            services.Configure<SerilogSettings>(config.GetSection("Serilog"));            
            services.Configure<EventBusSettings>(config.GetSection("EventBus"));        
            services.Configure<ServiceConnectionSettings>(config.GetSection("Services"));        
            services.Configure<ElkSettings>(config.GetSection("ElkStack"));     

            return services;
        }

        public static IServiceCollection AddCustomMvc(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddControllers();
            services.AddMvc();

            return services;
        }

        public static IServiceCollection AddCustomSwagger(this IServiceCollection services, IConfiguration config)
        {
            services.AddSwaggerGen(options => {
                options.SwaggerDoc("v1", new OpenApiInfo {
                    Title = Program.AppName,
                    Version = "v1",
                    Description = $"Application: {Program.AppName}"
                });
                options.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Scheme = "bearer"
                });
                options.OperationFilter<AuthenticationRequirementsFilter>();
            });

            return services;
        }

        public static IServiceCollection AddHealthChecks(this IServiceCollection services, IConfiguration config)
        {
            var hcBuilder = services.AddHealthChecks();

            hcBuilder.AddCheck("self", () => HealthCheckResult.Healthy());

            // Add health check for MongoDB database
            // Add health check for EventServiceBus

            return services;
        }        

        public static IServiceCollection AddDatabase<TDatabase>(this IServiceCollection services)
            where TDatabase : class, IDatabaseContext
        {            
            services.AddTransient<IDatabaseContext, TDatabase>();

            return services;
        }

        public static IServiceCollection AddCustomAuthentication(this IServiceCollection services, IConfiguration config)
        {           
            var settings = new AppSettings();
            config.GetSection("Application").Bind(settings);

            var key = Encoding.ASCII.GetBytes(settings.JwtToken.Secret); 

            services
                .AddAuthentication(options => {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options => {   
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddCors(options => {
                options.AddDefaultPolicy(
                    builder => builder
                        .SetIsOriginAllowed((host) => true)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            return services;
        }
    }
}