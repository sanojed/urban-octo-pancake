using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace micro.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InventoryController : ControllerBase
    {
       
        private ServerContext _context;
        private readonly ILogger<InventoryController> _logger;

        public InventoryController(ILogger<InventoryController> logger, ServerContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public ActionResult Get()
        {
            var l = _context.Inventory.ToList();
            return Ok(l);
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var d = _context.Inventory.FirstOrDefault(x => x.id == id);
            if(d == null) return BadRequest();
            _context.Inventory.Remove(d);
            _context.SaveChanges();
            return Ok(d.id);
        }

        [HttpPost]
        public ActionResult Post(Inventory inventory)
        {
            _context.Inventory.Add(inventory);
            _context.SaveChanges();
            return Ok(inventory);
        }

        [HttpPut]
        public ActionResult Put(Inventory inventory)
        {
            var d = _context.Inventory.FirstOrDefault(x => x.id == inventory.id);
            if (d == null) return BadRequest();
            d.name = inventory.name;
            d.quantity = inventory.quantity;
            _context.SaveChanges();
            return Ok(inventory);
        }
    }
}
