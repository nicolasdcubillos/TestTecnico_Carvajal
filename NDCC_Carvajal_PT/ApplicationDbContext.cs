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

             modelBuilder.Entity<Usuario>()
            .HasKey(b => b.UsuID);

            modelBuilder.Entity<Producto>()
            .HasKey(b => b.ProID);

             modelBuilder.Entity<Pedido>()
            .HasKey(b => b.PedID);

            modelBuilder.Entity<Pedido>()
            .HasOne<Usuario>(p => p.usuario)
            .WithMany()
            .HasForeignKey(p => p.PedUsu);


            modelBuilder.Entity<Pedido>()
            .HasOne<Producto>(p => p.producto)
            .WithMany()
            .HasForeignKey(p => p.PedPro);
        }
    }
}
