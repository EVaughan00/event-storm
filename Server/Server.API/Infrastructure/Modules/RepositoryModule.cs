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

            builder.RegisterType<PasswordResetRepository>()
                .As<IPasswordResetRepository>()
                .InstancePerLifetimeScope();
        }
    }
}