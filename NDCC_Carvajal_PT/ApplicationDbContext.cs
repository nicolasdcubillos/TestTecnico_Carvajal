using Microsoft.EntityFrameworkCore;
using NDCC_Carvajal_PT.Models;

namespace NDCC_Carvajal_PT
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Add the shadow property to the model
            //modelBuilder.Entity<Pedido>()
            //.Property<int>("PedUsu");

            // Use the shadow property as a foreign key
        }
    }
}
