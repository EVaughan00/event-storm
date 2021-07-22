using Server.Domain;

namespace Server.API.Models
{
    public class CoordinateDTO : ICoordinate
    {
        public double X { get; set; }
        public double Y { get; set; }

        public static CoordinateDTO Map(Coordinate coord) {
            return new CoordinateDTO() {
                X = coord.X,
                Y = coord.Y
            };
        }
    }
}