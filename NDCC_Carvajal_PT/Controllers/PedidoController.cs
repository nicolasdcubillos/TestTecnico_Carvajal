﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NDCC_Carvajal_PT.DTO;
using NDCC_Carvajal_PT.Models;

namespace NDCC_Carvajal_PT.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public PedidoController(ApplicationDbContext context) 
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Pedido>>> Get()
        {
            return await context.Pedidos.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Create(PedidoDto pedidoDto)
        {
            Pedido pedido = new Pedido() { 
                PedID = pedidoDto.PedID, 
                PedCant = pedidoDto.PedCant,
                PedSubtot = pedidoDto.PedSubtot,
                PedIVA = pedidoDto.PedIVA,
                PedPro = pedidoDto.PedPro,
                PedTotal = pedidoDto.PedTotal,
                PedUsu = pedidoDto.PedUsu,
                PedVrUnit = pedidoDto.PedVrUnit
            };

            var existUser = await context.Usuarios.AnyAsync(x => x.UsuID == pedidoDto.PedUsu);

            if (!existUser)
                return BadRequest("El usuario ingresado no existe en la base de datos.");

            var existProduct = await context.Productos.AnyAsync(x => x.ProID == pedidoDto.PedPro);

            if (!existProduct)
                return BadRequest("El producto ingresado no existe en la base de datos.");

            context.Add(pedido);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Put(PedidoDto pedidoDto)
        {
            var exist = await context.Pedidos.AnyAsync(x => x.PedID == pedidoDto.PedID);

            if (!exist)
                return NotFound();

            Pedido pedido = new Pedido()
            {
                PedID = pedidoDto.PedID,
                PedCant = pedidoDto.PedCant,
                PedSubtot = pedidoDto.PedSubtot,
                PedIVA = pedidoDto.PedIVA,
                PedPro = pedidoDto.PedPro,
                PedTotal = pedidoDto.PedTotal,
                PedUsu = pedidoDto.PedUsu,
                PedVrUnit = pedidoDto.PedVrUnit
            };

            context.Update(pedido);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var exist = await context.Pedidos.AnyAsync(x => x.PedID == id);
            if (!exist)
                return NotFound();

            context.Remove(new Pedido() { PedID = id });
            await context.SaveChangesAsync();

            return Ok();
        }
    }
}
