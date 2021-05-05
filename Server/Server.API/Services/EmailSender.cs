using Microsoft.Extensions.Options;
using System;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;
using Server.Config;

namespace Server.API.Services {

    public class EmailSender : IEmailSender {
        public EmailSender(IOptions<SendGridSettings> sendGrid) {
            _sendGrid = sendGrid.Value;
        }

        private SendGridSettings _sendGrid { get; }

        public Task SendEmailAsync(string email, string subject, string message) {
            return Execute(email, subject, message);
        }

        public async Task<Response> Execute(string email, string subject, string message) {
            try {
                var messageBody = new SendGridMessage() {
                    From = new EmailAddress("donotreply@ceep.nrel.gov", "NREL CEEP Web Tool"),
                    Subject = subject,
                    PlainTextContent = message,
                    HtmlContent = message
                };

                messageBody.AddTo(email);
                messageBody.SetClickTracking(false, false);
                
                var response = await Client.SendEmailAsync(messageBody);

                return response;
            } catch(Exception e) {
                throw new ApplicationException(e.Message);
            }
        }

        public Task<Response> Send(string email, string subject, string message) { 
            return this.Execute(email, subject, message);
        }

        public SendGridClient Client {
            get {
                return new SendGridClient(_sendGrid.SendGridKey);
            }
        }
    }
}