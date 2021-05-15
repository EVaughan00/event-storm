using System.ComponentModel.DataAnnotations;

namespace Server.API.Application.Models.Solution
{
    public class CreateSolution
    {
        [Required(ErrorMessage = "Solution name is required")]
        public string Name { get; set; }
    }
}