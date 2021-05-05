using MediatR;

namespace BuildingBlocks.Events
{
    public abstract class Command<T> : IdentifiedEvent, IRequest<T> {}

    public abstract class CommandHandler<T, R> : 
        IdentifiedResponseHandler<T, R>, 
        IRequestHandler<T, R> 
        where T: Command<R>
    {
        public CommandHandler(EventTracker eventTracker) 
            : base(eventTracker) { }
        
        public CommandHandler() {}
    }
}