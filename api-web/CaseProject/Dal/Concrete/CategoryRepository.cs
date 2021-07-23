using Core.Concrete;
using Dal.Abstract;
using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dal.Concrete
{
    public class CategoryRepository : EFBaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(CaseProjectContext context) : base(context)
        {

        }
    }
}
