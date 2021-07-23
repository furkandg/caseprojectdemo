using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.ModelMetaDataTypes
{
    public class UserMetaData
    {
        [Required(ErrorMessage = "Bu Alanı Boş Bırakamazsınız")]
        public string NickName { get; set; }

        [Required(ErrorMessage = "Bu Alanı Boş Bırakamazsınız")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Bu Alanı Boş Bırakamazsınız")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "Bu Alanı Boş Bırakamazsınız")]
        public string Sifre { get; set; }
        [Required(ErrorMessage = "Bu Alanı Boş Bırakamazsınız")]
        public string Email { get; set; }
    }
}
