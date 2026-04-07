using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly MarketPlaceDbContext _context;
        public AuthController(MarketPlaceDbContext context)
        {
            _context = context;
        }
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto request)
        {
            if(await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest("Email is already taken");
            }
            var newUser = new User
            {
                Name = request.Name,
                Email = request.Email,
                Role = request.Role,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                Message = "Registration Successful"
            });
        }
            [HttpPost("login")]
            public async Task<ActionResult> Login(LoginDto request)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
                if(user == null)
                {
                    return BadRequest("User Not Found");
                }
                if(!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                {
                    return BadRequest("Wrong Password");
                }
                return Ok(new
                {
                    Message = "Login successful!",
                    UserId = user.Id,
                    Role = user.Role,
                    Name = user.Name
                });
            }
    }
}
