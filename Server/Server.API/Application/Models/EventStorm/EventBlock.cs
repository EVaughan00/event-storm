
using Server.Domain;

namespace Server.API.Models
{
    public class EventBlockDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SolutionId { get; set; }
        public string Type { get; set; }
        public CoordinateDTO Coordinate { get; set; }

        public static EventBlockDTO Map(EventBlock block) {
            return new EventBlockDTO() {
                Id = block.Id.ToString(),
                Name = block.Name,
                SolutionId = block.SolutionId.ToString(),
                Type = block.Type.ToString().ToLower(),
                Coordinate = CoordinateDTO.Map(block.Coordinate)
            };
        }
    }

    
}