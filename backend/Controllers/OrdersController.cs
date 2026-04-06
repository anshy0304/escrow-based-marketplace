using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly MarketPlaceDbContext _context;
        public OrdersController(MarketPlaceDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult> Checkout(CheckOutRequestDto request)
        {
            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null)
                return NotFound("Product Not Found");
            var newOrder = new Order
            {
                ProductId = request.ProductId,
                BuyerId = request.BuyerId,
                Status = "Pending"
            };
            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();
            var escrow = new EscrowTransaction
            {
                OrderId = newOrder.Id,
                Amount = product.Price,
                Status = "Held"
            };
            _context.EscrowTransactions.Add(escrow);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                Message = "Checkout successful! Money is held in Escrow.",
                OrderId = newOrder.Id
            });
        }
        [HttpPost("{orderId}/confirm")]
        public async Task<ActionResult> ConfirmDelivery(int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null) return NotFound("Order Not Found");
            var escrow = await _context.EscrowTransactions
                .FirstOrDefaultAsync(e => e.OrderId == orderId);
            if (escrow == null)
                return NotFound("Escrow record not found for this order");
            order.Status = "Delivered";
            escrow.Status = "Released";
            await _context.SaveChangesAsync();
            return Ok(new
            {
                Message = "Delivery confirmed! Escrow funds have been released to the seller.",
                OrderStatus = order.Status,
                EscrowStatus = escrow.Status
            });
        }
    }
}
