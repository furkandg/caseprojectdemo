using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.ModelMetaDataTypes
{
    public class CategoryMetaData
    {
        [Required(ErrorMessage = "Bu Alanı Boş Bırakamazsınız")]
        public string Ad { get; set; }
    }
}
