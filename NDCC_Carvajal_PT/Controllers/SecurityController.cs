using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public SecurityController (ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(UsuarioDto usuarioDto)
        {
            var exist = await context.Usuarios.AnyAsync(x => x.UsuNombre == usuarioDto.UsuNombre);

            if (!exist)
                return NotFound();

            var usuario = context.Usuarios
                    .Where(u => u.UsuNombre == usuarioDto.UsuNombre)
                    .FirstOrDefault();

            string cifrado = Cifrador.encriptar(usuarioDto.UsuPass);

            if (cifrado == usuario.UsuPass)
                return Ok();
            else
                return BadRequest("Contraseña incorrecta.");

        }
    }
}
