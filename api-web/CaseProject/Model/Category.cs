using Microsoft.AspNetCore.Mvc;
using Model.ModelMetaDataTypes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model
{
    [ModelMetadataType(typeof(CategoryMetaData))]
    [Table("category")]
    public class Category : BaseModel
    {
        [Column("ad")]
        public string Ad { get; set; }

        [Column("aciklama")]
        public string Aciklama { get; set; }

        //public virtual ICollection<Articles> Articles { get; set; }

    }
}
