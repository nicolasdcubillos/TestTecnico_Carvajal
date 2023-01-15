namespace NDCC_Carvajal_PT.DTO
{
    public class PedidoDto
    {
        public int PedID { get; set; }
        public int PedUsu { get; set; }
        public int PedPro { get; set; }
        public decimal PedVrUnit { get; set; }
        public double PedCant { get; set; }
        public decimal PedSubtot { get; set; }
        public double PedIVA { get; set; }
        public decimal PedTotal { get; set; }
    }
}
