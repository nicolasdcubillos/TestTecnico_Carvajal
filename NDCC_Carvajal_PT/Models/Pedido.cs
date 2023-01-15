using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NDCC_Carvajal_PT.Models
{
    public class Pedido
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PedID { get; set; }

        public int PedUsu { get; set; }
        public int PedPro { get; set; }
        [Column(TypeName = "money")]
        public decimal PedVrUnit { get; set; }
        public double PedCant { get; set; }
        [Column(TypeName = "money")]
        public decimal PedSubtot { get; set; }
        public double PedIVA { get; set; }
        [Column(TypeName = "money")]
        public decimal PedTotal { get; set; }
        [ForeignKey("PedPro")]
        public Producto? producto { get; set; }
        [ForeignKey("PedUsu")]
        public Usuario? usuario { get; set; }

    }
}
