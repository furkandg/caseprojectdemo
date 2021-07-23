using Core.Concrete;
using Dal.Abstract;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Concrete
{
   public class UserRepository : EFBaseRepository<User>, IUserRepository
    {

        public UserRepository(CaseProjectContext context) : base(context)
        {

        }
    }
}
