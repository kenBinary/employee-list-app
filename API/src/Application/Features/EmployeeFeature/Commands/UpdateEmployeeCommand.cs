using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.src.Application.DTOs;
using API.src.Domain.Entities;
using API.src.Domain.Interfaces;
using MediatR;

namespace API.src.Application.Features.EmployeeFeature.Commands
{
    public record UpdateEmployeeCommand(
        int Id,
        string FirstName,
        string LastName,
        string? Email,
        string? Position
    ) : IRequest<Employee?>;

    // Handler
    public class UpdateEmployeeCommandHandler : IRequestHandler<UpdateEmployeeCommand, Employee?>
    {
        private readonly IEmployeeRepository _repository;

        public UpdateEmployeeCommandHandler(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<Employee?> Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
        {
            var dto = new UpdateEmployeeDto
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Position = request.Position
            };

            return await _repository.UpdateEmployee(request.Id, dto);
        }
    }
}