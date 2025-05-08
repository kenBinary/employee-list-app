using API.src.Models;

namespace API.src.Repository
{
    public interface IEmployeeRepository
    {
        public Task<Employee?> GetEmployee(int id);
        public Task<Employee[]?> GetEmployees();
        public Task<Employee?> AddEmployee(Employee employee);
        public Task<Employee?> RemoveEmployee(int id);
        public Task<Employee?> UpdateEmployee(int id, Employee employee);
    }
}