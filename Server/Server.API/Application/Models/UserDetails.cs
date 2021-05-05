using System.ComponentModel.DataAnnotations;
using Server.Domain;

namespace Server.API.Models
{
    public class UserDetails
    {
        public string Id { get; set; }
        
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]      
        public string LastName { get; set; }

        public static UserDetails Map(User user) {
            return new UserDetails 
            {
                Id = user.Id.ToString(),
                Email = user.Email.Address,
                FirstName = user.FirstName,
                LastName = user.LastName
            };   
        }
    }
}