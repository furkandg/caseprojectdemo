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
    public class CategoryService : ICategoryService
    {
        ICategoryRepository repository;
        public CategoryService(ICategoryRepository _repository)
        {
            repository = _repository;
        }

        public ResultMessage<Category> Add(Category data)
        {
           return repository.Add(data);
        }

        public ResultMessage<Category> Delete(int id)
        {
            return repository.Delete(id);
        }

        public ResultMessage<Category> Get(Expression<Func<Category, bool>> filter)
        {
            return repository.Get(filter);
        }

        public ResultMessage<ICollection<Category>> GetAll(Expression<Func<Category, bool>> filter = null)
        {
            return repository.GetAll(filter);
        }

        public ResultMessage<Category> SoftDelete(int id)
        {
            return repository.SoftDelete(id);
        }

        public ResultMessage<Category> Update(Category data)
        {
            return repository.Update(data);
        }
    }
}
