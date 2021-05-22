using Autofac;
using Server.Infrastructure;
using Server.Domain;

namespace Server.API.Infrastructure
{
    using Queries;

    public class RepositoryModule : Autofac.Module 
    {
        public RepositoryModule() {}

        protected override void Load(ContainerBuilder builder)
        {
            // Register query engines
            // ex:
            builder.RegisterType<UserQueries>()
                .As<IUserQueries>()
                .InstancePerLifetimeScope();

            // Register data repositories
            // ex:
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

            builder.RegisterType<EventStormRepository>()
                .As<IEventStormRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<ModelRepoRepository>()
                .As<IModelRepoRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<TaskStackRepository>()
                .As<ITaskStackRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<PasswordResetRepository>()
                .As<IPasswordResetRepository>()
                .InstancePerLifetimeScope();
        }
    }
}