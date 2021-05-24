using System.ComponentModel.DataAnnotations;

namespace Server.API.Models
{
    public class ContributorDTO
    {
        [Required(ErrorMessage = "Collaborator name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Collaborators email is required")]
        public string Email { get; set; }
    }
}