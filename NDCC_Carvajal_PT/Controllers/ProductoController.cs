using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpPost]
        public async Task<ActionResult> Create(Producto producto)
        {
            context.Add(producto);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Put(Producto producto)
        {
            var exist = await context.Productos.AnyAsync(x => x.ProID == producto.ProID);

            if (!exist)
                return NotFound();

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
