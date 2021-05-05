using BuildingBlocks.Utils;

namespace Server.Config
{
    public class AppSettings {
        public int Lifespan { get; set; }        
        public string Environment { get; set; }        
        public string[] AllowedHosts { get; set ; }
        public JwtTokenSettings JwtToken { get; set; }
    }    

    public class BackgroundTaskSettings {  
        public int ClearExpiredSessions { get; set; }
        public int ClearExpiredPasswordResets { get; set; }
    }
    
    public class SerilogSettings {
        public MinimumLevelSettings MinimumLevel { get; set; }

        public class MinimumLevelSettings {
            public string Default { get; set; }
            public OverrideSettings Override { get; set; }       
            public class OverrideSettings {
                public string Microsoft { get; set; }
                public string System { get; set; }
            }
        }
    }
        
    public class SendGridSettings
    {
        public string SendGridUser { get; set; }
        public string SendGridKey { get; set; }
    }

}