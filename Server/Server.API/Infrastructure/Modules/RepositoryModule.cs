using Autofac;
using Server.Infrastructure;
using Server.Domain;

namespace Server.API.Infrastructure
{
    using Queries;
    using Server.Infrastructure.Utilities;

    public class RepositoryModule : Autofac.Module 
    {
        public RepositoryModule() {}

        protected override void Load(ContainerBuilder builder)
        {
            // Register query engines
            builder.RegisterType<UserQueries>()
                .As<IUserQueries>()
                .InstancePerLifetimeScope();

            builder.RegisterType<SolutionQueries>()
                .As<ISolutionQueries>()
                .InstancePerLifetimeScope();

            builder.RegisterType<EventStormQueries>()
                .As<IEventStormQueries>()
                .InstancePerLifetimeScope();

            builder.RegisterType<TemplateQueries>()
                .As<ITemplateQueries>()
                .InstancePerLifetimeScope();

            // Register data repositories
            builder.RegisterType<UserRepository>()
                .As<IUserRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<SessionRepository>()
                .As<ISessionRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<SolutionRepository>()
                .As<ISolutionRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<TemplateRepository>()
                .As<ITemplateRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<MetricsSnapshotRepository>()
                .As<IMetricsSnapshotRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<EventBlockRepository>()
                .As<IEventBlockRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<EventEdgeRepository>()
                .As<IEventEdgeRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<ModelRepository>()
                .As<IModelRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<TaskRepository>()
                .As<ITaskAggregateRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<PasswordResetRepository>()
                .As<IPasswordResetRepository>()
                .InstancePerLifetimeScope();

            // Register utilities
            builder.RegisterType<EventStormUtility>()
                .As<IEventStormUtility>()
                .InstancePerLifetimeScope();
        }
    }
}