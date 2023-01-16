using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NDCC_Carvajal_PT.DTO;
using NDCC_Carvajal_PT.Models;
using NDCC_Carvajal_PT.Utils;

namespace NDCC_Carvajal_PT.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IConfiguration _config;
        public SecurityController (ApplicationDbContext context, IConfiguration config)
        {
            this.context = context;
            _config = config;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(UsuarioDto usuarioDto)
        {
            var exist = await context.Usuarios.AnyAsync(x => x.UsuNombre == usuarioDto.UsuNombre);

            if (!exist)
                return BadRequest("Usuario no existente.");

            var usuario = context.Usuarios
                    .Where(u => u.UsuNombre == usuarioDto.UsuNombre)
                    .FirstOrDefault();

            string cifrado = Cifrador.encriptar(usuarioDto.UsuPass);

            if (cifrado == usuario.UsuPass)
            {
                var token = GenerateToken(usuario);
                return Ok(token);
            }
            else
                return BadRequest("Contraseña incorrecta.");

        }
        [ApiExplorerSettings(IgnoreApi = true)]
        private string GenerateToken(Usuario usuario)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.UsuNombre)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }

    }
}

