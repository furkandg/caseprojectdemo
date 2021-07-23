using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model.DtoModel
{
    public class ArticlesDto
    {

        [Column("id")]
        public int Id { get; set; }
        [Column("title")]
        public string Title { get; set; }

        [Column("articletext")]
        public string Text { get; set; }

        [Column("articlepath")]
        public string Path { get; set; }

        //[Column("kurumid")]
        [ForeignKey("Kategori")]
        public int KategoriId { get; set; }

        public virtual Category Kategori { get; set; }
    }
}
