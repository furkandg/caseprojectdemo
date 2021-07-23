using Core.Concrete;
using Model;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Bll.Abstract
{
   public interface IUserService
    {
        ResultMessage<User> Add(User data);
        ResultMessage<User> Update(User data);
        ResultMessage<User> Delete(int id);
        ResultMessage<User> SoftDelete(int id);
        ResultMessage<ICollection<User>> GetAll(Expression<Func<User, bool>> filter = null);
        ResultMessage<User> Get(Expression<Func<User, bool>> filter);
    }
}
