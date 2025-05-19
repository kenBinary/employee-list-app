using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.src.Domain.Entities;
using API.src.Domain.Interfaces;
using MediatR;

namespace API.src.Application.Features.EmployeeFeature.Querries
{
    public record GetEmployeesQuery() : IRequest<Employee[]>;

    public class GetEmployeesQueryHandler : IRequestHandler<GetEmployeesQuery, Employee[]>
    {
        private readonly IEmployeeRepository _repository;

        public GetEmployeesQueryHandler(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<Employee[]> Handle(GetEmployeesQuery request, CancellationToken cancellationToken)
        {
            var employees = await _repository.GetEmployees();
            return employees ?? [];
        }
    }
}