using System.Collections.Generic;
using MongoDB.Bson;
using Server.Domain;

namespace Server.Infrastructure.Utilities
{
    public class SolutionBlueprint {
        public string Name { get; set; }        
        public string TemplateId { get; set; }
        public ISolutionDefinition Definition { get; set; }
        public ISelectableTools SelectedTools { get; set; }
    }

    public class TemplateBlueprint {
        public string Name { get; set; }
        public string SolutionId { get; set; }
        public ITemplateDefinition Definition { get; set; }
        public ITemplatableTools TemplatableTools { get; set; }
    }
    public static class SolutionUtility
    {
        public static Template TemplateFromBlueprint(TemplateBlueprint blueprint) {

            var template = new Template();
            
            template.SetName(blueprint.Name);
            template.Define(blueprint.Definition);
            template.TemplateTools(blueprint.TemplatableTools);
            template.SetSolutionReference(new ObjectId(blueprint.SolutionId));

            return template;
        }

        public static Solution SolutionFromBlueprint(SolutionBlueprint blueprint) {

            var solution = new Solution();
            
            solution.SetName(blueprint.Name);
            solution.Define(blueprint.Definition);
            solution.UseTools(blueprint.SelectedTools);

            if (!string.IsNullOrEmpty(blueprint.TemplateId))
                solution.SetTemplateReference(new ObjectId(blueprint.TemplateId));
                
            return solution;
        }
    }
}