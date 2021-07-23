using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.ModelMetaDataTypes
{
   public class ArticlesMetaData
    {
        [Required(ErrorMessage = "Bu Alanı Boş Bırakamazsınız")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Bu Alanı Boş Bırakamazsınız")]
        public string Text { get; set; }

    }
}
