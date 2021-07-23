using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Helper
{
    public class SeoUrl
    {
        public static string UrlOlustur(string data)
        {
            int adet = data.IndexOf(" ");

            if (adet < 0)
            {
                data = data.ToLower();
                return data.Replace("ş", "s").Replace("Ş", "s").Replace("ç", "c").Replace("Ç", "c").Replace("ö", "o").Replace("Ö", "o").Replace("ü", "u").Replace("Ü", "u").Replace("İ", "i").Replace("ı", "i").Replace("ğ", "g").Replace("Ğ", "g");
            }
            else
            {
                data = data.Replace(",", "").Replace("\"", "").Replace("'", "").Replace(":", "").Replace(";", "").Replace(".", "").Replace("!", "").Replace("?", "").Replace(")", "").Replace("(", " ").Replace("&", " ").Replace(" ", " "); if (data.Length > 75)
                {
                    data = data.Substring(0, 75);
                    data = data.Substring(0, data.LastIndexOf(" "));
                }
                data = data.Replace(" ", "-").ToLower();
                return data.Replace("ş", "s").Replace("Ş", "s").Replace("ç", "c").Replace("Ç", "c").Replace("ö", "o").Replace("Ö", "o").Replace("ü", "u").Replace("Ü", "u").Replace("İ", "i").Replace("ı", "i").Replace("ğ", "g").Replace("Ğ", "g");
            }

        }


    }
}
