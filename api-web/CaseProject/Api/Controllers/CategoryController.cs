using Bll;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]

    public class CategoryController : ControllerBase
    {
        IUnitOfWorkService service;
        public CategoryController(IUnitOfWorkService _service)
        {
            service = _service;
        }

        [HttpPost("[action]")]
        public IActionResult Add([FromBody]Category model)
        {
            if (ModelState.IsValid)
            {
                service.Category.Add(model);
                service.SaveChanges();
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost("[action]/{id}")]
        public IActionResult Delete(int id)
        {
            var model = service.Category.Delete(id);
            service.SaveChanges();
            return Ok();
        }

        [HttpPost("[action]/{id}")]
        public IActionResult SoftDelete(int id)
        {
            var model = service.Category.SoftDelete(id);
            service.SaveChanges();
            return Ok();
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public ICollection<Category> ListAll()
        {
            ICollection<Category> model = service.Category.GetAll().Data;
            return model;
        }

        [HttpPost("[action]/{id}")]
        [AllowAnonymous]
        public IActionResult Get(int id)
        {
            var model = service.Category.Get(x=>x.Id==id).Data;
            return Ok(model);
        }


        [HttpPost("[action]")]
        public IActionResult Update(Category model)
        {
            if (ModelState.IsValid)
            {
                service.Category.Update(model);
                service.SaveChanges();
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
