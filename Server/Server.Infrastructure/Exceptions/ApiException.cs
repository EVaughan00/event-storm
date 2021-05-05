using System;  
using System.Net.Http;
using System.Net;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Server.Infrastructure
{

    public class ApiException: Exception {
        public Dictionary<string, string[]> Errors { get; set; }
        private HttpStatusCode _statusCode { get; set; } 

        public ApiException() {
            Errors = new Dictionary<string, string[]>();
        }

        public ApiException(HttpResponseMessage response)
            :base($"Request returned with status code: {response.StatusCode}") {
            DeserializeErrors(response);
        }


        public ApiException(Dictionary<string, string[]> errors) {
            Errors = errors;
            _statusCode = HttpStatusCode.BadRequest;
        }

        public ApiException(string message) : base(message) { 
            Errors = new Dictionary<string, string[]>();
        }

        public ApiException AddError(string error, string reason) {
            string[] reasons;
            Errors.TryGetValue(error, out reasons);
        
            if (reasons != null) {
                var reasonList = reasons.ToList();
                reasonList.Add(reason);
                reasons = reasonList.ToArray();
            } else {
                reasons = new string[]{ reason };
            }
            
            Errors.Remove(error);
            Errors.Add(error, reasons);

            return this;
        }

        private void DeserializeErrors(HttpResponseMessage response) {
            try {   
                var error = response.Content.ReadAsStringAsync().Result;
                var server = new { Errors = new Dictionary<string, string[]>() };
                var model = JsonConvert.DeserializeAnonymousType(error, server);      

                if (model.Errors != null)
                    Errors = model.Errors;
                else
                    Errors = JsonConvert.DeserializeAnonymousType(error, server.Errors);
            } catch(Exception e) {
                Console.WriteLine(e.Message);
            }
        }

        public HttpStatusCode StatusCode
        {
            get {
                return _statusCode;
            }
        } 

        public new ApiExceptionData Data {
            get {
                return new ApiExceptionData {
                    Errors = Errors,
                    StatusCode = StatusCode,
                    Title = Message,
                    Type = ""
                };
            }
        }
        
        public class ApiExceptionData {
            public Dictionary<string, string[]> Errors { get; set; }
            public HttpStatusCode StatusCode { get; set; }
            public string Title { get; set; }
            public string Type { get; set; }
        }
    }
}