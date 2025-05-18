using API.src.Application.DTOs;
using API.src.Domain.Entities;

namespace API.src.Domain.Interfaces
{
    public interface IEmployeeRepository
    {
        public Task<Employee?> GetEmployee(int id);
        public Task<Employee[]?> GetEmployees();
        public Task<Employee?> AddEmployee(Employee employee);
        public Task<Employee?> RemoveEmployee(int id);
        public Task<Employee?> UpdateEmployee(int id, UpdateEmployeeDto employee);
    }
}