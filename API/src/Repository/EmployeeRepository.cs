using API.src.Data;
using API.src.Models;
using Microsoft.EntityFrameworkCore;

namespace API.src.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {

        private readonly ApplicationDbContext _context;

        public EmployeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Employee?> GetEmployee(int id)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(id);
                return employee;
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}