using Dal;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers
{
    public class LoginController : Controller
    {
        IUnitOfWork service;
        public LoginController(IUnitOfWork _service)
        {
            service = _service;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Register()
        {
            
            return View();
        }
    }
}
