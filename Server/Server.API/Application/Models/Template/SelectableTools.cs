using Server.Domain;

namespace Server.API.Models
{
    public class TemplatableTools : ITemplatableTools
    {
        public bool EventStorm { get; set; }
        public bool ModelRepository { get; set; }
        public bool TaskStack { get; set; }

    }
}