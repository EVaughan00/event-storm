using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Server.API 
{
    using Queries;

    public class AuthorizeIdentityAttribute: TypeFilterAttribute 
    {
        public AuthorizeIdentityAttribute(): base(typeof(AuthorizeIdentityFilter)) {  }
    }

    public class AuthorizeIdentityFilter: IAuthorizationFilter 
    {

        public void OnAuthorization(AuthorizationFilterContext context) {
            try {
                var svc = context.HttpContext.RequestServices;
                var claim = context.HttpContext.Request.GetIdentityClaims();
                var userQueries = (IUserQueries) svc.GetService(typeof(IUserQueries));
                var task = userQueries.ValidateUser(claim);
                task.Wait();
            } catch {
                context.Result = new ForbidResult();
            }
        }
    }
}