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
    public class UsuarioController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public UsuarioController(ApplicationDbContext context) 
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> Get()
        {
            return await context.Usuarios.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Usuario>> GetById(int id)
        {
            var exist = await context.Usuarios.AnyAsync(x => x.UsuID == id);

            if (!exist)
                return NotFound();

            var usuario = context.Usuarios.Find(id);

            return Ok(usuario);
        }

        [HttpPost]
        public async Task<ActionResult> Create(UsuarioDto usuarioDto)
        {
            var exist = await context.Usuarios.AnyAsync(x => x.UsuNombre == usuarioDto.UsuNombre);

            if (exist)
                return BadRequest("Ya existe un usuario en la base de datos con ese nombre.");

            Usuario usuario = new Usuario()
            {
                UsuNombre = usuarioDto.UsuNombre,
                UsuPass = Cifrador.encriptar(usuarioDto.UsuPass)
            };

            context.Add(usuario);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(UsuarioDto usuarioDto, int id)
        {
            var exist = await context.Usuarios.AnyAsync(x => x.UsuID == id);

            if (!exist)
                return NotFound();

            Usuario usuario = new Usuario()
            {
                UsuNombre = usuarioDto.UsuNombre,
                UsuPass = Cifrador.encriptar(usuarioDto.UsuPass)
            };

            context.Update(usuario);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var exist = await context.Usuarios.AnyAsync(x => x.UsuID == id);

            if (!exist)
                return NotFound();

            context.Remove(new Usuario() { UsuID = id });
            await context.SaveChangesAsync();

            return Ok();
        }
    }
}
