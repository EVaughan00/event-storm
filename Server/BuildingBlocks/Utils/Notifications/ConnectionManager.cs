
using System.Collections.Generic;

namespace BuildingBlocks.Utils
{

    public class ConnectionManager: IConnectionManager
    {
        public static Dictionary<string, HashSet<string>> UserMap =
            new Dictionary<string, HashSet<string>>();

        public IEnumerable<string> OnlineUsers { get { return UserMap.Keys; }}        

        public void AddConnection(string userId, string connectionId)
        {
            if (userId == null || userId == "")
                return;

            lock (UserMap)
            {
                if (!UserMap.ContainsKey(userId))
                {
                    UserMap[userId] = new HashSet<string>();
                }
                UserMap[userId].Add(connectionId);
            }
        }

        public void RemoveConnection(string connectionId) 
        {
            lock (UserMap)
            {
                foreach(var userId in UserMap.Keys) 
                {
                    if (UserMap.ContainsKey(userId) && UserMap[userId].Contains(connectionId))
                    {
                        UserMap[userId].Remove(connectionId);
                        break;
                    }
                }
            }
        }
        
        public HashSet<string> GetConnections(string userId) 
        {
            var connections = new HashSet<string>();

            try {
                lock (UserMap) {
                    connections = UserMap[userId];
                }
            } catch {   
                connections = null;
            }

            return connections;
        }
    }
}
