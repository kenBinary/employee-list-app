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

        public async Task<Employee?> AddEmployee(Employee employee)
        {
            try
            {
                await _context.Employees.AddAsync(employee);
                await _context.SaveChangesAsync();
                return employee;
            }
            catch (Exception)
            {
                return null;
            }
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

        public async Task<Employee[]?> GetEmployees()
        {
            try
            {
                var employees = await _context.Employees.ToArrayAsync();
                if (employees.Length > 0)
                {
                    return employees;
                }
                else
                {
                    return [];
                }
            }
            catch (Exception)
            {
                return [];
            }
        }

        public async Task<Employee?> RemoveEmployee(int id)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(id);

                if (employee == null)
                {
                    return null;
                }

                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();

                return employee;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Task<Employee?> UpdateEmployee(int id, Employee employee)
        {
            throw new NotImplementedException();
        }
    }
}