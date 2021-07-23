using Core.Abstract;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Concrete
{
    public class EFBaseRepository<TEntity> : IRepository<TEntity>
          where TEntity : class, IVeri, new()
     
    {
        protected DbContext context;

        public EFBaseRepository(DbContext _context)
        {
            context = _context;
        }
        public ResultMessage<TEntity> Add(TEntity data)
        {
            try
            {
              
                var addedData = context.Entry(data);
                addedData.State = EntityState.Added;
                return new ResultMessage<TEntity> { BasariliMi = true, Data = data, Mesaj = "Kayıt eklenmeye hazır." };
            }
            catch (Exception ex)
            {
              
                return new ResultMessage<TEntity> { BasariliMi = false, Data = null, Mesaj = ex.Message };
            }
          
        }

        public ResultMessage<TEntity> Delete(int id)
        {
            try
            {
               
                var data = context.Set<TEntity>().Find(id);
                var deletedData = context.Entry(data);
                deletedData.State = EntityState.Deleted;
                return new ResultMessage<TEntity> { BasariliMi = true, Data = data, Mesaj = "Kayıt silinmeye hazır." };
               
            }
            catch (Exception ex)
            {
                return new ResultMessage<TEntity> { BasariliMi = false, Data = null, Mesaj = ex.Message };
            }
        }

        public ResultMessage<TEntity> Get(Expression<Func<TEntity, bool>> filter)
        {
            try
            {

                TEntity data = context.Set<TEntity>().Where(filter).FirstOrDefault();
                return data == null ? new ResultMessage<TEntity> { BasariliMi = false, Mesaj = "Aranan kriterlere uygun kayıt bulunamadı." } : new ResultMessage<TEntity> { BasariliMi = true, Mesaj = "Kayıt getirildi.", Data = data };

            }
            catch (Exception ex)
            {
                return new ResultMessage<TEntity> { BasariliMi = false, Mesaj = ex.Message };
            }
        }

        public ResultMessage<ICollection<TEntity>> GetAll(Expression<Func<TEntity, bool>> filter = null)
        {
            try
            {
                ICollection<TEntity> dataList;
                if (filter == null)
                {
                    dataList = context.Set<TEntity>().AsNoTracking().Where(x => x.IsActive == 0).ToList();
                }
                else
                {
                    dataList = context.Set<TEntity>().AsNoTracking().Where(filter).ToList();
                }
                return new ResultMessage<ICollection<TEntity>> { BasariliMi = true, Data = dataList, Mesaj = "Veriler listelendi." };

            }
            catch (Exception ex)
            {
                return new ResultMessage<ICollection<TEntity>> { BasariliMi = false, Mesaj = ex.Message };
            }
        }

        public ResultMessage<TEntity> SoftDelete(int id)
        {
            try
            {
                var data = context.Set<TEntity>().Find(id);
                var softDeletedData = context.Entry(data);
                data.IsActive = 1;
                softDeletedData.State = EntityState.Modified;
                return new ResultMessage<TEntity> { BasariliMi = true, Data = data, Mesaj = "Kayıt silinmeye hazır." };
             
            }
            catch (Exception ex)
            {
                return new ResultMessage<TEntity> { BasariliMi = false, Data = null, Mesaj = ex.Message };
            }
        }

        public ResultMessage<TEntity> Update(TEntity data)
        {
            try
            {
                var updatedData = context.Entry(data);
                updatedData.State = EntityState.Modified;
              
                return new ResultMessage<TEntity> { BasariliMi = true, Data = data, Mesaj = "Kayıt güncellenmeye hazır." };
            }
            catch (Exception ex)
            {
                return new ResultMessage<TEntity> { BasariliMi = false, Data = null, Mesaj = ex.Message };
            }
        }

      
    }
}
