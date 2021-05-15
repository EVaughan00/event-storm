using System;
using Server.Domain;

namespace Server.Infrastructure
{
    public class SolutionFactory
    {

        private readonly IServiceProvider _serviceProvider;

        public SolutionFactory(IServiceProvider serviceProvider) {
            _serviceProvider = serviceProvider;
        }

        public Solution CreateSolution(string name) {
            return new Solution(name);
        }
    }
}