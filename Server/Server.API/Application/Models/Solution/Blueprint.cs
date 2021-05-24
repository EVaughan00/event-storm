using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.API.Models
{
    public class SolutionBlueprint
    {
        [Required(ErrorMessage = "Solution owner ID is required")]
        public string OwnerId { get; set; }

        [Required(ErrorMessage = "Solution name is required")]
        public string Name { get; set; }

        [Required(AllowEmptyStrings=true)]
        public string Description { get; set; }

        [Required(AllowEmptyStrings=true)]
        public string TemplateId { get; set; }
        public SelectedTools SelectedTools {get; set;}
        public List<ContributorDTO> Contributors { get; set; }
    }
}