using API.src.Application.DTOs;
using API.src.Domain.Entities;

namespace API.src.Application.Mappings
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