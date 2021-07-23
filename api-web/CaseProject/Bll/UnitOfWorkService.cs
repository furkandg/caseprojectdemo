using Bll.Abstract;
using Bll.Concrete;
using Core.Concrete;
using Dal;
using Dal.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bll
{
    public class UnitOfWorkService : IUnitOfWorkService
    {
        CaseProjectContext context;
        public UnitOfWorkService(CaseProjectContext _context)
        {
            context = _context;
        }

        IUserService user;
        ICategoryService category;
        IArticlesService articles;

        public IUserService User => user ?? (user = new UserService(new UserRepository(context)));
        public ICategoryService Category => category ?? (category = new CategoryService(new CategoryRepository(context)));
        public IArticlesService Articles => articles ?? (articles = new ArticlesService(new ArticlesRepository(context)));

        public void Dispose()
        {
            context.Dispose();
        }

        public ResultMessage<int> SaveChanges()
        {
            using (var dbTransaction = context.Database.BeginTransaction())
            {
                try
                {
                    int result = context.SaveChanges();
                    dbTransaction.Commit();
                    return new ResultMessage<int> { BasariliMi = true, Data = result, Mesaj = "Kayıt İşlemi Başarılı" };
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    return new ResultMessage<int> { BasariliMi = false, Data = -1, Mesaj = ex.Message };
                }
            }
        }

    }
}
