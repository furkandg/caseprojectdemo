using Microsoft.AspNetCore.Mvc;
using Model.ModelMetaDataTypes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Text;

namespace Model.ViewModel
{
    [ModelMetadataType(typeof(UserMetaData))]
    public class LoginViewModel
    {
       string deger;
        [Column("email")]
        public string Email { get; set; }

        [Column("sifre")]
        public string Sifre {

            get
            {
                return deger;
            }
            set
            {
                deger = Helper.Hash.GetHash<MD5>(value, Encoding.UTF8).ToString();
            }
        
        }
    }
}
