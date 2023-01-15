using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NDCC_Carvajal_PT.Models
{
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UsuID { get; set; }
        public string? UsuNombre { get; set; }
        public string? UsuPass { get; set; }
    }
}
