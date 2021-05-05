using Autofac;
using Autofac.Builder;
using System.Collections.Generic;
using System.Linq;

namespace BuildingBlocks.Utils 
{
    public class RegisteredList<T>: List<T> where T: class {
        public RegisteredList(IEnumerable<T> list) : base (list) {}
    }

    public static class AutofacExtensions 
    {
        public static RegisteredList<T> GetAssemblyTypes<T>(this IComponentContext context) where T: class
        {            
            var objType = typeof(T);
            var objects = context.ComponentRegistry.Registrations
                .Where(r => objType.IsAssignableFrom(r.Activator.LimitType))
                .Select(r => r.Activator.LimitType)
                .Select(w => context.Resolve(w) as T);

            return new RegisteredList<T>(objects);
        }

        public static IRegistrationBuilder<RegisteredList<T>, SimpleActivatorData, SingleRegistrationStyle> RegisterAssemblyList<T>(this ContainerBuilder builder) where T: class { 
            return builder.Register<RegisteredList<T>>(c => c.GetAssemblyTypes<T>());
        }
    }
}