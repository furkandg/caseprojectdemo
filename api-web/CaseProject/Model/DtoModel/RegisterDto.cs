using Microsoft.AspNetCore.Mvc;
using Model.ModelMetaDataTypes;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Model.DtoModel
{
    [ModelMetadataType(typeof(UserMetaData))]
    public class RegisterDto
    {
        string deger;
       

        public string Name { get; set; }
        public string LastName { get; set; }

        public string Sifre
        {
            get
            {
                return deger;
            }
            set
            {
                deger = Helper.Hash.GetHash<MD5>(value, Encoding.UTF8).ToString();
            }
        }
        public string Email { get; set; }
    }
}
