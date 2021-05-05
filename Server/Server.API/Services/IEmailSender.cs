using SendGrid;
using System.Threading.Tasks;

namespace Server.API.Services {
    public interface IEmailSender 
    {
        Task SendEmailAsync(string email, string subject, string message);
        Task<Response> Send(string email, string subject, string message);

    }

}