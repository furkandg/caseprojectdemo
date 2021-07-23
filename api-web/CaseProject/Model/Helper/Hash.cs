using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Model.Helper
{
    public class Hash
    {
        /// <summary>
        /// Hash'leme işlemini gerçekleştiren metoddur.
        /// </summary>
        /// <typeparam name="T">Hash'leme formatı</typeparam>
        /// <param name="input">Hash'lenecek veri bilgisi.</param>
        /// <param name="encoding">Encoding formatı bilgisi.</param>
        /// <returns></returns>
        public static string GetHash<T>(string input, Encoding encoding) where T : HashAlgorithm
        {
            //create a Hash object
            T hashobj = (T)HashAlgorithm.Create(typeof(T).ToString());
            // Convert the input string to a byte array and compute the hash. 
            byte[] data = hashobj.ComputeHash(encoding.GetBytes(input));
            // Create a new Stringbuilder to collect the bytes
            StringBuilder sBuilder = new StringBuilder();
            // Loop through each byte of the hashed data  
            // and format each one as a hexadecimal string. 
            for (int i = 0; i < data.Length; i++)
                sBuilder.Append(data[i].ToString("x2"));
            // Return the hexadecimal string. 
            return sBuilder.ToString();
        }
    }
}
