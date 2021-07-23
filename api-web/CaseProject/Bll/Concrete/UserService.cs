using Bll.Abstract;
using Core.Concrete;
using Dal.Abstract;
using Model;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Bll.Concrete
{
   public class UserService : IUserService
    {
        IUserRepository repository;
        public UserService(IUserRepository _repository)
        {
            repository = _repository;
        }

        public ResultMessage<User> Add(User data)
        {
            return repository.Add(data);
        }

        public ResultMessage<User> Delete(int id)
        {
            return repository.Delete(id);
        }

        public ResultMessage<User> Get(Expression<Func<User, bool>> filter)
        {
            return repository.Get(filter);
        }

        public ResultMessage<ICollection<User>> GetAll(Expression<Func<User, bool>> filter = null)
        {
            return repository.GetAll(filter);
        }

        public ResultMessage<User> SoftDelete(int id)
        {
            return repository.SoftDelete(id);
        }

        public ResultMessage<User> Update(User data)
        {
            return repository.Update(data);
        }
    }
}
