using Core.Concrete;
using Dal.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
   public interface IUnitOfWork:IDisposable
    {
        public IUserRepository User { get;}
        public ICategoryRepository Category { get; }
        public IArticlesRepository Articles { get; }

        ResultMessage<int> SaveChanges();
    }
}
