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

        public Task<Employee?> AddEmployee(Employee employee)
        {
            throw new NotImplementedException();
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

        public Task<Employee[]?> GetEmployees()
        {
            throw new NotImplementedException();
        }

        public Task<Employee?> RemoveEmployee(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Employee?> UpdateEmployee(int id, Employee employee)
        {
            throw new NotImplementedException();
        }
    }
}