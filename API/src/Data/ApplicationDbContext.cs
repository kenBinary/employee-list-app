using API.src.Models;
using Microsoft.EntityFrameworkCore;

namespace API.src.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Employee>().HasData(
                new Employee
                {
                    Id = 1,
                    FirstName = "Juan",
                    LastName = "Dela Cruz",
                    Email = "JCruz@gmail.com.com",
                    Position = "Software Developer"
                },
                new Employee
                {
                    Id = 2,
                    FirstName = "Mark",
                    LastName = "Henry",
                    Email = "MHenry@gmail.com.com",
                    Position = "Database Administrator"
                },
                new Employee
                {
                    Id = 3,
                    FirstName = "Michael",
                    LastName = "Water",
                    Email = "MWater@example.com",
                    Position = "QA Engineer"
                }
            );
        }
    }
}