namespace Server.Config
{
    public class EventBusSettings {
        public string Definition { get; set; }
        public string Connection { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int RetryCount { get; set; }
    }    
}