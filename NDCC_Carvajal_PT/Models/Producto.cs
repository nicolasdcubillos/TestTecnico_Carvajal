using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NDCC_Carvajal_PT.Models
{
    public class Producto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProID { get; set; }
        public string? ProDesc { get; set; }
        [Column(TypeName = "money")]
        public decimal ProValor { get; set; }
    }
}
