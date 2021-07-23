using Core.Concrete;
using Dal.Abstract;
using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dal.Concrete
{
    public class ArticlesRepository : EFBaseRepository<Articles>, IArticlesRepository
    {
        public ArticlesRepository(CaseProjectContext context) : base(context)
        {

        }
    }
}
