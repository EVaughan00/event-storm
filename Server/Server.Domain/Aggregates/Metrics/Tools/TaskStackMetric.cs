namespace Server.Domain
{
    public class TaskStackMetrics
    {
        public Count TotalTasks { get; private set; }
        public Count CompletedTasks { get; private set; }
    }
}