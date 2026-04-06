using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        // GET: api/test
        [HttpGet]
        public IActionResult GetMessage()
        {
            return Ok("Backend is working 🚀");
        }

        // GET: api/test/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok($"You requested ID: {id}");
        }

        // POST: api/test
        [HttpPost]
        public IActionResult CreateData([FromBody] string data)
        {
            return Ok($"Received data: {data}");
        }
    }
}