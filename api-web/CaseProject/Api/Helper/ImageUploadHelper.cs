
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Helper
{
    public class ImageUploadHelper
    {
       
        public static string ImageUpload(IFormFile file,string dosyaKlasor)
        {
            string imageExtension = Path.GetExtension(file.FileName);
                string imageName = Guid.NewGuid() + imageExtension;
                string path = Path.Combine(Directory.GetCurrentDirectory(), $"MyFiles/{dosyaKlasor}/Ordinary/{imageName}");
                using var stream = new FileStream(path, FileMode.Create);
                file.CopyTo(stream);
                stream.Close();
                return $"/MyFiles/{dosyaKlasor}/Ordinary/{imageName}";
        }
    }
}
