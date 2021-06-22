using Server.Domain;

namespace Server.API.Models
{
    public class TemplateDefinition : ITemplateDefinition
    {
        public string Description { get; set; }
        public string CodeBase { get; set; }
    }
}