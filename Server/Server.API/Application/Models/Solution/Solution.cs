using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Server.Domain;

namespace Server.API.Models
{
    public class SolutionDTO
    {
        public string Id { get; set; }
        [Required(ErrorMessage = "Solution name is required")]
        public string Name { get; set; }
        public string TemplateId { get; set; }
        [Required(AllowEmptyStrings = true)]
        public string Description { get; set; }
        [Required(AllowEmptyStrings = true)]
        public string CodeBase { get; set; }
        public bool UseEventStorm { get; set; }
        public bool UseTaskStack { get; set; }
        public bool UseModelRepository { get; set; }
        [Required]
        public List<ContributorDTO> Contributors { get; set; }

        public SolutionBlueprint ToBlueprint() {
            var blueprint = new SolutionBlueprint();

            blueprint.Definition = new SolutionDefinition();
            blueprint.SelectedTools = new SelectableTools();

            blueprint.Name = Name;
            blueprint.TemplateId = TemplateId;

            blueprint.Definition.Description = Description;
            blueprint.Definition.CodeBase = CodeBase;

            blueprint.SelectedTools.UseEventStorm = UseEventStorm;
            blueprint.SelectedTools.UseModelRepository = UseModelRepository;
            blueprint.SelectedTools.UseTaskStack = UseTaskStack;

            return blueprint;
        }

        public static SolutionDTO Map(Solution solution) {
            return new SolutionDTO() {
                Id = solution.Id.ToString(),
                Name = solution.Name,
                Description = solution.Definition.Description,
                CodeBase = solution.Definition.CodeBase,
                TemplateId = solution.FromTemplateId.ToString(),
                UseEventStorm = solution.EventStorm.Active,
                UseModelRepository = solution.ModelRepository.Active,
                UseTaskStack = solution.TaskStack.Active
            };
        }
    }
}