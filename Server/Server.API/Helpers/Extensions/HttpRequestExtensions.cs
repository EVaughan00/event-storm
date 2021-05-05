using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Http;

namespace Server.API
{
    using Models;
    
    public static class IdentityExtensions
    {
        public static IdentityClaims GetIdentityClaims(this HttpRequest request) {
            return IdentityClaims.FromToken(request.GetAuthToken());
        }
        
        public static string GetAuthToken(this HttpRequest request) {
            return request?.Headers[HeaderNames.Authorization];
        }
    }
}