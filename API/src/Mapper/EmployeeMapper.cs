using API.src.DTOs;
using API.src.Models;

namespace Api.src.Mapper
{
    public static class EmployeeMapper
    {
        public static EmployeeDto ToEmployeeDto(this Employee employeeModel)
        {
            return new EmployeeDto
            {
                Id = employeeModel.Id,
                FullName = $"{employeeModel.FirstName} {employeeModel.LastName}",
                Email = employeeModel.Email,
                Position = employeeModel.Position
            };
        }
    }
}