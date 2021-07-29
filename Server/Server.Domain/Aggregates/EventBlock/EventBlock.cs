using BuildingBlocks.SeedWork;
using MongoDB.Bson;
using Server.Domain;

namespace Server.Domain
{
    public class EventBlock : Entity, IAggregateRoot
    {
        public string Name { get; set; }
        public ObjectId SolutionId { get; set; }
        public BlockType Type { get; set; }
        public Coordinate Coordinate { get; set; }

        public EventBlock(string name) {
            Name = name;
            Coordinate = new Coordinate();
        }
        public void AssignToSolution(Solution solution) {
            SolutionId = solution.Id;
        }
        public void SetType(string type) {
            Type = Enumeration.FromName<BlockType>(type);
        }
        public void SetCoordinate(ICoordinate coordinate) {
            Coordinate.From(coordinate);
        }
    }

    public class BlockType : Enumeration {
        public static BlockType Command = new BlockType(1, "Command");
        public static BlockType Query = new BlockType(2, "Query");
        public static BlockType Effect = new BlockType(3, "Effect");
        public static BlockType Process = new BlockType(4, "Process");
        public static BlockType Label = new BlockType(5, "Label");

        public BlockType(int id, string name) : base(id, name) {}
    }
}