using System.Text;

namespace Server.Config
{    
    public class MongoDBSettings {
        public string Host { get; set; }
        public string Port { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Database { get; set; }

        public string ConnectionString {
            get { 
                if (string.IsNullOrWhiteSpace(Host))
                    Host = "localhost";

                if (string.IsNullOrWhiteSpace(Port))
                    Port = "27017";

                if (string.IsNullOrWhiteSpace(Username) ||
                    string.IsNullOrWhiteSpace(Password))
                    return $"mongodb://{Host}:{Port}";
                
                return $"mongodb://{Username}:{Password}@{Host}:{Port}";
            }
        }
    }  
}
