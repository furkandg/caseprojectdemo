using Core.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class BaseModel:IVeri
    {
        [Column("id")]
        [Key]
        public int Id { get; set; }
        [Column("kayittarihi")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime KayitTarihi { get; set; } = DateTime.Now;

        [Column("silindimi")]
        public int SilindiMi { get; set; }

        [Column("isactive")]
        public int IsActive { get; set; } 
    }
}
