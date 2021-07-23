using AutoMapper;
using Bll;
using Dal;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Model;
using Model.DtoModel;
using Model.ViewModel;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class UserController : ControllerBase
    {

        IUnitOfWorkService service;
        public IMapper Mapper { get; }
        readonly IConfiguration _configuration;
        public UserController(IUnitOfWorkService _service, IConfiguration configuration, IMapper mapper)
        {
            Mapper = mapper;
            service = _service;
            _configuration = configuration;
        }

        [HttpPost("[action]")]
        public IActionResult Register(RegisterDto model)
        {
            if (ModelState.IsValid)
            {
                User _model = Mapper.Map<User>(model);
                Token.TokenHandler tokenHandler = new Token.TokenHandler(_configuration);
                Token.Token token = tokenHandler.CreateAccessToken(_model);
                _model.RefreshToken = token.RefreshToken;
                _model.RefreshTokenEndDate = token.Expiration.AddMinutes(30);
                service.User.Add(_model);
                service.SaveChanges();
                return Ok(token.AccessToken);
            }
            else
            {
                return NotFound();
            }

        }

        [HttpPost("[action]")]
        public IActionResult Enter(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var _model = service.User.Get(x => x.Email == model.Email && x.Sifre == model.Sifre).Data;
                if (_model !=null)
                {
                   
                    Token.TokenHandler tokenHandler = new Token.TokenHandler(_configuration);
                    Token.Token token = tokenHandler.CreateAccessToken(_model);
                    _model.RefreshToken = token.RefreshToken;
                    _model.RefreshTokenEndDate = token.Expiration.AddMinutes(3);
                    service.User.Update(_model);
                    service.SaveChanges();
                    return Ok(token.AccessToken);
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return NotFound();
            }

        }
    }
}
