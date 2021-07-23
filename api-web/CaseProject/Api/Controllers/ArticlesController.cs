using AutoMapper;
using Bll;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Model.DtoModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ArticlesController : ControllerBase
    {
        IUnitOfWorkService service;
        private readonly IWebHostEnvironment hostEnvironment;
        public IMapper mapper { get; }

        public ArticlesController(IUnitOfWorkService _service, IWebHostEnvironment _hostEnvironment, IMapper _mapper)
        {
            service = _service;
            mapper = _mapper;
            hostEnvironment = _hostEnvironment;

        }

      
        [HttpPost("[action]")]
        public IActionResult Add([FromForm]Articles model, IFormFile fileImage)
        {

            if (ModelState.IsValid && fileImage != null)
            {
                model.Path = Helper.ImageUploadHelper.ImageUpload(fileImage, "Articles");
                model.Slug = Helper.SeoUrl.UrlOlustur(model.Title);
                service.Articles.Add(model);
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
            var model = service.Articles.Delete(id);
            service.SaveChanges();
            return Ok();
        }

        [HttpPost("[action]/{id}")]
        public IActionResult SoftDelete(int id)
        {
            var model = service.Articles.SoftDelete(id);
            service.SaveChanges();
            return Ok();
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public ICollection<Articles> ListAll()
        {
            ICollection<Articles> model = service.Articles.GetAll().Data.OrderByDescending(x => x.KayitTarihi).ToList();
            return model;
        }

        [HttpPost("[action]/{id}")]
        [AllowAnonymous]
        public IActionResult Get(int id)
        {
            Articles model = service.Articles.Get(x => x.Id == id).Data;
            ArticlesDto _model = mapper.Map<ArticlesDto>(model);
            return Ok(_model);
        }

        [HttpPost("[action]/{slug}")]
        [AllowAnonymous]
        public IActionResult GetBySlug(string slug)
        {
            Articles model = service.Articles.Get(x => x.Slug == slug).Data;
            ArticlesDto _model = mapper.Map<ArticlesDto>(model);
            return Ok(_model);
        }

        [HttpPost("[action]/{sira}")]
        [AllowAnonymous]
        public IActionResult GetListInfinitiveScrool(int sira)
        {

            ICollection<Articles> model = service.Articles.GetAll().Data.OrderByDescending(x => x.KayitTarihi).Skip(sira).Take(2).ToList();
            return Ok(model);
        }

        [HttpPost("[action]")]
        public IActionResult Update([FromForm] Articles model, IFormFile fileImage)
        {
            if (ModelState.IsValid)
            {
                if (fileImage!=null)
                    model.Path = Helper.ImageUploadHelper.ImageUpload(fileImage, "Articles");

                model.Slug = Helper.SeoUrl.UrlOlustur(model.Title);
                service.Articles.Update(model);
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
