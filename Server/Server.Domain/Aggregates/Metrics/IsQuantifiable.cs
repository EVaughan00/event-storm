namespace Server.Domain
{
    public interface IsQuantifiable
    {
        Count GetAggregateTotal();
        Count GetCompleted();
    }
}