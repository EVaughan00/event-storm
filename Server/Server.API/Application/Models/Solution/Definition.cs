using Server.Domain;

namespace Server.API.Models
{
    public class SolutionDefinition : ISolutionDefinition
    {
        public string Description { get; set; }
        public string CodeBase { get; set; }
    }
}