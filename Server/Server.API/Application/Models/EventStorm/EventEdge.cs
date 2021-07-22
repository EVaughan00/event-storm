
using Server.Domain;

namespace Server.API.Models
{
    public class EventEdgeDTO
    {
        public string Id { get; set; }
        public string SolutionId { get; set; }
        public CoordinateDTO Source { get; set; }
        public CoordinateDTO Destination { get; set; }
        public static EventEdgeDTO Map(EventEdge edge) {
            return new EventEdgeDTO() {
                Id = edge.Id.ToString(),
                SolutionId = edge.SolutionId.ToString(),
                Source = CoordinateDTO.Map(edge.Source),
                Destination = CoordinateDTO.Map(edge.Destination)
            };
        }        
    }
}