using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model.DtoModel
{
   public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<User, RegisterDto>();
            CreateMap<RegisterDto, User>();

            CreateMap<Articles, ArticlesDto>();
            CreateMap<ArticlesDto, Articles>();
        }
    }
}
