using Descontrolada.Data;
using Descontrolada.Models;
using Descontrolada.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Descontrolada.Controllers
{
    [ApiController]
    [Route(template: "v1")]
    public class ProductController : ControllerBase
    {
        [HttpGet]
        [Route(template: "GetProduct")]
        public async Task<IActionResult> GetProduct(
            [FromServices] AppDbContext context)
        {
            var products = await context
                                 .Products
                                 .AsNoTracking()
                                 .ToListAsync();
            if (products == null)
            {
                return NotFound();
            }
            return Ok(products);
        }

        [HttpGet]
        [Route(template: "GetById/{id}")]
        public async Task<IActionResult> GetByIdAsync(
            [FromServices] AppDbContext context, int id)
        {
            var products = await context
                                 .Products
                                 .AsNoTracking()
                                 .FirstOrDefaultAsync(x => x.Id == id);
            if (products == null)
            {
                return NotFound();
            }
            return Ok(products);
        }

        [HttpPost]
        [Route(template: "CreateProduct")]
        public async Task<IActionResult> CreateProduct([FromServices] AppDbContext context, [FromBody] CreateProductViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var product = new Product
            {
                ProductName = model.ProductName,
                ProductLocation = model.ProductLocation,
                ProductQtd = model.ProductQtd
            };
            try
            {
                await context.Products.AddAsync(product);
                await context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
            }
            catch (Exception e)
            {
                return BadRequest();
            }              
        }

        [HttpPut]
        [Route(template: "UpdateProduct/{id}")]
        public async Task<IActionResult> UpdateProduct([FromServices] AppDbContext context, int id, [FromBody] CreateProductViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var product = await context.Products.FirstOrDefaultAsync(x => x.Id == id);

            if (product == null)
                return NotFound();

            try
            {
                product.ProductName = model.ProductName;
                product.ProductLocation = model.ProductLocation;
                product.ProductQtd = model.ProductQtd;

                context.Products.Update(product);
                await context.SaveChangesAsync();
                return Ok(product);
            }
            catch(Exception e)
            {
                return BadRequest();
            }
        }


        [HttpDelete]
        [Route(template: "DeleteProduct/{id}")]
        public IActionResult DeleteProduto([FromServices] AppDbContext context, int id)
        {
            var product = context.Products.Find(id);
            if (product == null)
                return NotFound();

            context.Products.Remove(product);
            context.SaveChanges();
            return NoContent();
        }

    }
}