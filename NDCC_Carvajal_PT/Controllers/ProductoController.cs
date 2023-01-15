using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NDCC_Carvajal_PT.DTO;
using NDCC_Carvajal_PT.Models;

namespace NDCC_Carvajal_PT.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public ProductoController(ApplicationDbContext context) 
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Producto>>> Get()
        {
            return await context.Productos.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Producto>> GetById(int id)
        {
            var exist = await context.Productos.AnyAsync(x => x.ProID == id);

            if (!exist)
                return NotFound();

            var usuario = context.Productos.Find(id);

            return Ok(usuario);
        }

        [HttpPost]
        public async Task<ActionResult> Create(ProductoDto productoDto)
        {
            Producto producto = new Producto()
            {
                ProDesc = productoDto.ProDesc,
                ProValor = productoDto.ProValor
            };

            context.Add(producto);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(ProductoDto productoDto, int id)
        {
            var exist = await context.Productos.AnyAsync(x => x.ProID == id);

            if (!exist)
                return NotFound();

            Producto producto = new Producto()
            {
                ProID = id,
                ProDesc = productoDto.ProDesc,
                ProValor = productoDto.ProValor
            };

            context.Update(producto);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var exist = await context.Productos.AnyAsync(x => x.ProID == id);
            if (!exist)
                return NotFound();

            context.Remove(new Producto() { ProID = id });
            await context.SaveChangesAsync();

            return Ok();
        }
    }
}
