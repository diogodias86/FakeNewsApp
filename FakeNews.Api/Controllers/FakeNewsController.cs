using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FakeNews.Api.DataContext.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FakeNews.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FakeNewsController : ControllerBase
    {
        private readonly FakeNewsRepository _repository;

        public FakeNewsController(FakeNewsRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get(string query)
        {
            var result = _repository.GetAllByFilter(query);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var result = _repository.GetById(id);

            return Ok(result);
        }
    }
}