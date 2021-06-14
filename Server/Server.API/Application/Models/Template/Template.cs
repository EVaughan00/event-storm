using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Server.Domain;

namespace Server.API.Models
{
    public class TemplateDTO
    {
        [Required(ErrorMessage = "Solution name is required")]
        public string Name { get; set; }
        [Required]
        public string SolutionId { get; set; }
        [Required(AllowEmptyStrings = true)]
        public string Description { get; set; }
        [Required(AllowEmptyStrings = true)]
        public string CodeBase { get; set; }

        public static TemplateDTO Map(Template template) {
            return new TemplateDTO() {
                Name = template.Name,
                Description = template.Definition.Description,
                CodeBase = template.Definition.CodeBase,
                SolutionId = template.SolutionId.ToString()
            };
        }
    }
}