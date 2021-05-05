namespace Server.Config
{

    public class ServiceConnectionSettings {
        public ServiceConnection ExperimentManagement { get; set; }
        public ServiceConnection ExperimentOrchestration { get; set; }
        public ServiceConnection HistoricalData { get; set; }
        public ServiceConnection Identity { get; set; }
        public ServiceConnection PlatformValidation { get; set; }
        public ServiceConnection DataTrafficController { get; set; }
    }

    public class ServiceConnection
    {
        private string _host;

        public string Host { 
            get { return "http://" + _host; }
            set { _host = value; }
        }
        public int Http { get; set; }
        public int Https { get; set; }
        public int Grpc { get; set; }

        public string HttpAddress { get { return Host + ":" + Http; } }
        public string HttpsAddress { get { return "https://" + _host + ":" + Https; } }
        public string GrpcAddress { get { return Host + ":" + Grpc; } }
    }
}
