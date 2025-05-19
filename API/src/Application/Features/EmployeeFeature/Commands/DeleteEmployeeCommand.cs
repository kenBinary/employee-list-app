using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.src.Domain.Entities;
using API.src.Domain.Interfaces;
using MediatR;

namespace API.src.Application.Features.EmployeeFeature.Commands
{
    public record DeleteEmployeeCommand(int Id) : IRequest<Employee?>;

    public class DeleteEmployeeCommandHandler : IRequestHandler<DeleteEmployeeCommand, Employee?>
    {
        private readonly IEmployeeRepository _repository;

        public DeleteEmployeeCommandHandler(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<Employee?> Handle(DeleteEmployeeCommand request, CancellationToken cancellationToken)
        {
            return await _repository.RemoveEmployee(request.Id);
        }
    }
}