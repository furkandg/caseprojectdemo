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
   public class ArticlesService : IArticlesService
    {
        IArticlesRepository repository;
        public ArticlesService(IArticlesRepository _repository)
        {
            repository = _repository;
        }

        public ResultMessage<Articles> Add(Articles data)
        {
            return repository.Add(data);
        }

        public ResultMessage<Articles> Delete(int id)
        {
            return repository.Delete(id);
        }

        public ResultMessage<Articles> Get(Expression<Func<Articles, bool>> filter)
        {
            return repository.Get(filter);
        }

        public ResultMessage<ICollection<Articles>> GetAll(Expression<Func<Articles, bool>> filter = null)
        {
            return repository.GetAll(filter);
        }

        public ResultMessage<Articles> SoftDelete(int id)
        {
            return repository.SoftDelete(id);
        }

        public ResultMessage<Articles> Update(Articles data)
        {
            return repository.Update(data);
        }
    }
}
