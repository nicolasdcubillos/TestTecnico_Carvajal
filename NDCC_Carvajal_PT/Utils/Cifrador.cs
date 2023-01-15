using System.Security.Cryptography;
using System.Text;

namespace NDCC_Carvajal_PT.Utils
{
    public class Cifrador
    {
        public static string encriptar(string obj)
        {
            using (SHA256 mySHA256 = SHA256.Create())
            {
                byte[] hashValue = mySHA256.ComputeHash(Encoding.ASCII.GetBytes(obj));
                
                StringBuilder stringbuilder = new StringBuilder();

                foreach (byte c in hashValue)
                    stringbuilder.Append(c.ToString("x2"));

                return stringbuilder.ToString();
            }
        }

    }
}
