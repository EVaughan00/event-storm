using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Server.API.Controllers
{
    // [Route("")]
    // [ApiController]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        
        // GET: /<controller>/
        // [Route("/swagger")] 
        // [HttpGet("/swagger")]
        public IActionResult Index()
        {
            _logger.LogInformation("Swagger endpoint accessed...");
            return new RedirectResult("~/swagger");
        }
        
        // [Route("/")]
        // [HttpGet("/")]
        // [AuthorizeIdentity]
        // public async Task<IActionResult> Index()
        // {
        //     await Task.CompletedTask;

        //     return View("App");
        // }
    }
}
