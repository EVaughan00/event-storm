
using System.ComponentModel.DataAnnotations;

namespace Server.API.Models {

    public class PasswordResetEmail {
        public string Email { get; set; }
        public string ResetCode { get; set; }
    }

    public class PasswordResetRequest {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }
    }

    public class PasswordResetCode
    { 
        [Required(ErrorMessage = "Password reset code is required")]
        public string ResetCode { get; set; }
    }

    public class PasswordUpdate {
        [Required(ErrorMessage = "A password is required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Password confirmation is required")]
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public string PasswordConfirm { get; set; }
    }
}