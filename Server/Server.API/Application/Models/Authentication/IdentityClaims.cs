using BuildingBlocks.Utils;

namespace Server.API.Models
{
    public class IdentityClaims
    {
        public string Email { get; set; }
        public string Id { get; set; }

        public override string ToString()
        {
            return "Identity: { email: " + Email + " }, { id: " + Id + " }";
        }

        public static IdentityClaims FromToken(string token)
        {            
            if (token == null)
                throw new System.Exception("Session token is missing or invalid. Please login");

            var email = JsonWebTokenUtils.GetClaim(token, "email");
            var id = JsonWebTokenUtils.GetClaim(token, "userId");

            return new IdentityClaims {
                Email = email,
                Id = id
            };
        }
    }
}