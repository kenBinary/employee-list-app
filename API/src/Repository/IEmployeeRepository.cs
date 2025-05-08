using API.src.Models;

namespace API.src.Repository
{
    public interface IEmployeeRepository
    {
        public Task<Employee?> GetEmployee(int id);
    }
}