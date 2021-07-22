using System.Collections.Generic;
using BuildingBlocks.SeedWork;

namespace Server.Domain
{

    public interface ICoordinate {
        double X { get; set; }
        double Y { get; set; }
    }
    public class Coordinate : ValueObject
    {
        public double X {get; private set;}
        public double Y {get; private set;}
        public Coordinate(double x, double y) {X = x;Y = Y;}
        public Coordinate(ICoordinate coordinate) {X=coordinate.X;Y=coordinate.Y;}
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return X;
            yield return Y;
        }
    }
}