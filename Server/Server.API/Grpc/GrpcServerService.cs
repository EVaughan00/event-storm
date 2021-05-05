using Grpc.Core;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace GrpcServer
{
    public class GrpcServerService : ServerGrpc.ServerGrpcBase
    {
        private readonly ILogger<GrpcServerService> _logger;

        public GrpcServerService(ILogger<GrpcServerService> logger) {
            _logger = logger;
        }

        public override async Task<ServerActionResponse> AddServer(ServerMessage server, ServerCallContext context)
        {
            var response = new ServerActionResponse();
            response.Success = false;

            if (server == null) {
                context.Status = new Status(StatusCode.NotFound,  "Action failed");
                return response;
            }
            
            response.Success = true;            
            await Task.CompletedTask;
            context.Status = new Status(StatusCode.OK, "Action was successful");
            return response;
        }
    }    
}