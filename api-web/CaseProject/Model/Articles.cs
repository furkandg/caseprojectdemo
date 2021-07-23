using Microsoft.AspNetCore.Mvc;
using Model.ModelMetaDataTypes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model
{

    [Table("articles")]
    public class Articles:BaseModel
    {
        [Column("title")]
        public string Title { get; set; }

        [Column("slug")]
        public string Slug { get; set; }

        [Column("goruntuleme")]
        public int Goruntuleme { get; set; }

        [Column("articletext")]
        public string Text { get; set; }

        [Column("articlepath")]
        public string Path { get; set; }

        [Column("kucukpath")]
        public string KucukPath { get; set; }

        [Column("oncekiyazi")]
        public string OncekiYazi { get; set; }
        [Column("sonrakiyazi")]
        public string SonrakiYazi { get; set; }

        [Column("oykullanankisisayisi")]
        public int OyKullananKisiSayisi { get; set; }

        [Column("yazipuani")]
        public int YaziPuani { get; set; }


        //[Column("kurumid")]
        [ForeignKey("Kategori")]
        public int KategoriId { get; set; }

        public virtual Category Kategori { get; set; }
    }
}
