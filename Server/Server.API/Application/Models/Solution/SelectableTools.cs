using Server.Domain;

namespace Server.API.Models
{
    public class SelectableTools : ISelectableTools
    {
        public bool UseEventStorm { get; set; }
        public bool UseModelRepository { get; set; }
        public bool UseTaskStack { get; set; }

    }
}