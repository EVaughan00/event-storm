using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Server.Domain;

namespace Server.API.Models
{
    public class TemplateRequirements {
        [Required]
        public string SolutionId { get; set; }
    }
    public class TemplateDTO
    {
        public string Id { get; set; }
        [Required(ErrorMessage = "Solution name is required")]
        public string Name { get; set; }
        [Required]
        public string SolutionId { get; set; }
        [Required(AllowEmptyStrings = true)]
        public string Description { get; set; }
        [Required(AllowEmptyStrings = true)]
        public string CodeBase { get; set; }
        public bool UseEventStorm { get; set; }
        public bool UseTaskStack { get; set; }
        public bool UseModelRepository { get; set; }

        public static TemplateDTO Map(Template template) {
            return new TemplateDTO() {
                Id = template.Id.ToString(),
                Name = template.Name,
                Description = template.Definition.Description,
                CodeBase = template.Definition.CodeBase,
                SolutionId = template.SolutionId.ToString(),
                UseEventStorm = template.Tools.EventStorm.Active,
                UseModelRepository = template.Tools.ModelRepository.Active,
                UseTaskStack = template.Tools.TaskStack.Active
            };
        }
    }
}