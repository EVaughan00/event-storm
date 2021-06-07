namespace Server.Domain
{
    public class ModelRepositoryMetrics
    {
        public Count TotalEventBlocks { get; private set; }
        public Count CompletedEventBlocks { get; private set; }
    }
}