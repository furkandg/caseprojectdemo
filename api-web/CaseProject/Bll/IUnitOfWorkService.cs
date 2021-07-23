using Bll.Abstract;
using Core.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bll
{
   public interface IUnitOfWorkService : IDisposable
    {
        IUserService User { get; }
        ICategoryService Category { get; }
        IArticlesService Articles { get; }

        ResultMessage<int> SaveChanges();

    }
}
