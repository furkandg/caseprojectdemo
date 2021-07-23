using Microsoft.AspNetCore.Mvc;
using Model.ModelMetaDataTypes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [ModelMetadataType(typeof(UserMetaData))]
    [Table("user")]
    public class User:BaseModel
    {
   
        [Column("name")]

        public string Name { get; set; }

        [Column("lastname")]
        public string LastName { get; set; }

        [Column("sifre")]
        public string Sifre { get; set; }

        [Column("email")]
        public string Email { get; set; }
     
        public string RefreshToken { get; set; }
       
        public DateTime? RefreshTokenEndDate { get; set; }

        [NotMapped]
        [Column("getnamefull")]
        public string GetNameFull
        {
            get => Name + " " + LastName;
        }

    }
}
