using Server.Domain;

namespace Server.API.Models
{
    public class SelectableTools : ISelectableTools
    {
        public bool EventStorm { get; set; }
        public bool ModelRepository { get; set; }
        public bool TaskStack { get; set; }

    }
}