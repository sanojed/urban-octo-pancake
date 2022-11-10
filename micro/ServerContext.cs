using System;
using Microsoft.EntityFrameworkCore;

namespace micro
{
    public class ServerContext : DbContext
    {
       public ServerContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Inventory> Inventory { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
