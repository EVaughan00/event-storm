using Microsoft.AspNetCore.Routing;
using GrpcServer;
using Microsoft.AspNetCore.Builder;

namespace Server.API.Infrastructure
{

    public class GrpcServiceModule
    {
        public static void MapEndpoints(IEndpointRouteBuilder builder)
        {            
            builder.MapGrpcService<GrpcServerService>();    
            // Register other GRPC Services
        }
    }   
}