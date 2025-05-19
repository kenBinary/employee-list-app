using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.src.Domain.Entities;
using API.src.Domain.Interfaces;
using MediatR;

namespace API.src.Application.Features.EmployeeFeature.Commands
{
    public record CreateEmployeeCommand(
        string FirstName,
        string LastName,
        string? Email,
        string? Position
    ) : IRequest<Employee>;

    public class CreateEmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand, Employee>
    {
        private readonly IEmployeeRepository _repository;

        public CreateEmployeeCommandHandler(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<Employee> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
        {
            var employee = new Employee
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Position = request.Position
            };

            var result = await _repository.AddEmployee(employee);
            return result!;
        }
    }

}