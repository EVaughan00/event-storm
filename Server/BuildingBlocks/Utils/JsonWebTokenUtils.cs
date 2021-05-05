using System;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace BuildingBlocks.Utils {
    public class JwtTokenSettings {
        public string Secret { get; set; }
        public string Cookie { get; set; }
        public int TimeoutDays { get; set; }
        public string Redirect { get; set; }
    }

    public class JsonWebTokenUtils
    {
		public static string GenerateToken(string email, string userId, JwtTokenSettings settings) 
		{
			var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(settings.Secret));
			var tokenHandler = new JwtSecurityTokenHandler();
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[]
				{
					new Claim("userId", userId),
					new Claim("email", email),
				}),
				Expires = DateTime.UtcNow.AddDays(settings.TimeoutDays),
				SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
        }

		public static bool ValidateToken(string token, JwtTokenSettings settings)
		{
			if (token.IndexOf("Bearer") >= 0)
				token = token.Substring(7);
				
			var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(settings.Secret));
			var tokenHandler = new JwtSecurityTokenHandler();

			try {
				tokenHandler.ValidateToken(token, new TokenValidationParameters {
					ValidateIssuerSigningKey = true,
					ValidateIssuer = false,
					ValidateAudience = false,
					IssuerSigningKey = key
				}, out SecurityToken vT);
			} catch {
				return false;
			}

			return true;
		}

		public static string GetClaim(string token, string claimType)
		{
			if (token.IndexOf("Bearer") >= 0)
				token = token.Substring(7);

			var tokenHandler = new JwtSecurityTokenHandler();
			var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

			var claim = securityToken.Claims.First(claim => claim.Type == claimType);
			return claim.Value;
		}
    }
}