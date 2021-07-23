using Core.Concrete;
using Model;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Bll.Abstract
{
    public interface ICategoryService
    {
        ResultMessage<Category> Add(Category data);
        ResultMessage<Category> Update(Category data);
        ResultMessage<Category> Delete(int id);
        ResultMessage<Category> SoftDelete(int id);
        ResultMessage<ICollection<Category>> GetAll(Expression<Func<Category, bool>> filter = null);
        ResultMessage<Category> Get(Expression<Func<Category, bool>> filter);
    }
}
