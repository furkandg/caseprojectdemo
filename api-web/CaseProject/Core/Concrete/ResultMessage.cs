using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Concrete
{
   public class ResultMessage<T> 
    {
        public bool BasariliMi { get; set; }
        //geri donus verisi istersem icine basıcam
        public T Data { get; set; }
        //hata mesajı veya bilgi mesajı vermej istersem icine basıcam
        public string Mesaj { get; set; }
    }
}
