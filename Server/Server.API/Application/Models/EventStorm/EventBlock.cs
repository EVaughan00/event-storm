
using Server.Domain;

namespace Server.API.Models
{
    public class EventBlockDTO
    {
        public string Id { get; set; }
        public string SolutionId { get; set; }
        public CoordinateDTO Coordinate { get; set; }

        public static EventBlockDTO Map(EventBlock block) {
            return new EventBlockDTO() {
                Id = block.Id.ToString(),
                SolutionId = block.SolutionId.ToString(),
                Coordinate = CoordinateDTO.Map(block.Coordinate)
            };
        }
    }

    
}