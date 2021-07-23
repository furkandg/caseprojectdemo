using Core.Concrete;
using Dal.Abstract;
using Dal.Concrete;
using System;


namespace Dal
{
    public class UnitOfWork : IUnitOfWork
    {
        CaseProjectContext context;
        public UnitOfWork(CaseProjectContext _context)
        {
            context = _context;
        }
        IUserRepository user;
        ICategoryRepository category;
        IArticlesRepository articles;
        public IUserRepository User => user ?? (user = new UserRepository(context));
        public ICategoryRepository Category => category ?? (category = new CategoryRepository(context));
        public IArticlesRepository Articles => articles ?? (articles = new ArticlesRepository(context));

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
