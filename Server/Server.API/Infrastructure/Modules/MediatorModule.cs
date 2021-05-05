using Autofac;
using MediatR;
using System.Reflection;

namespace Server.API.Infrastructure
{
    using Commands;
    using DomainEvents;
    using Notifications;

    public interface Foo<in T> {

    }

    public class MediatorModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {  
            builder.RegisterAssemblyTypes(typeof(IMediator).GetTypeInfo().Assembly)
                .AsImplementedInterfaces();
            
            builder.RegisterAssemblyTypes(typeof(ReferenceCommand).GetTypeInfo().Assembly)
                .AsClosedTypesOf(typeof(IRequestHandler<,>));

            builder.RegisterAssemblyTypes(typeof(ReferenceCommandHandler).GetTypeInfo().Assembly)
                .AsClosedTypesOf(typeof(IRequestHandler<,>));

            builder.RegisterAssemblyTypes(typeof(ReferenceDomainEventHandler).GetTypeInfo().Assembly)
                .AsClosedTypesOf(typeof(INotificationHandler<>));              

            builder.RegisterAssemblyTypes(typeof(ReferenceNotificationHandler).GetTypeInfo().Assembly)
                .AsClosedTypesOf(typeof(INotificationHandler<>));

            builder.Register<ServiceFactory>(context => {
                var componentContext = context.Resolve<IComponentContext>();
                
                return systemType => { 
                    object defaultObject; 
                    var canResolveType = componentContext.TryResolve(systemType, out defaultObject);

                    return canResolveType ? defaultObject : null; 
                };                
            }); 
        }        
    }

}