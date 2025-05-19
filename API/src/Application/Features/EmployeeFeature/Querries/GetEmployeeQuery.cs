using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.src.Domain.Entities;
using API.src.Domain.Interfaces;
using MediatR;

namespace API.src.Application.Features.EmployeeFeature.Querries
{
    public record GetEmployeeQuery(int Id) : IRequest<Employee?>;

    public class GetEmployeeQueryHandler : IRequestHandler<GetEmployeeQuery, Employee?>
    {
        private readonly IEmployeeRepository _repository;

        public GetEmployeeQueryHandler(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<Employee?> Handle(GetEmployeeQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetEmployee(request.Id);
        }
    }
}