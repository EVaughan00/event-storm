using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Server.Domain;
using Server.Infrastructure.Utilities;

namespace Server.API.Models
{
    public class TemplateDTO
    {       
        public string Id { get; set; }
        [Required(ErrorMessage = "Template name is required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Solution id is required")]
        public string SolutionId { get; set; }
        [Required(AllowEmptyStrings = true)]
        public string Description { get; set; }
        public bool UseEventStorm { get; set; }
        public bool UseTaskStack { get; set; }
        public bool UseModelRepository { get; set; }

        public static TemplateDTO Map(Template template) {
            return new TemplateDTO() {
                Id = template.Id.ToString(),
                Name = template.Name,
                Description = template.Definition.Description,
                SolutionId = template.SolutionId.ToString(),
                UseEventStorm = template.Tools.EventStorm.Active,
                UseModelRepository = template.Tools.ModelRepository.Active,
                UseTaskStack = template.Tools.TaskStack.Active
            };
        }

        public TemplateBlueprint ToBlueprint() {
            var blueprint = new TemplateBlueprint();
            
            blueprint.Definition = new TemplateDefinition();
            blueprint.TemplatableTools = new TemplatableTools();

            blueprint.Name = Name;
            blueprint.SolutionId = SolutionId;
            blueprint.Definition.Description = Description;
            blueprint.TemplatableTools.EventStorm = UseEventStorm;
            blueprint.TemplatableTools.ModelRepository = UseModelRepository;
            blueprint.TemplatableTools.TaskStack = UseTaskStack;

            return blueprint;
        }
    }
}