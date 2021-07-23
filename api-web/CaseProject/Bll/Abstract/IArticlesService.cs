using Core.Concrete;
using Model;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Bll.Abstract
{
   public interface IArticlesService
    {
        ResultMessage<Articles> Add(Articles data);
        ResultMessage<Articles> Update(Articles data);
        ResultMessage<Articles> Delete(int id);
        ResultMessage<Articles> SoftDelete(int id);
        ResultMessage<ICollection<Articles>> GetAll(Expression<Func<Articles, bool>> filter = null);
        ResultMessage<Articles> Get(Expression<Func<Articles, bool>> filter);
    }
}
