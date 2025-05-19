using API.src.Application.DTOs;
using API.src.Application.Features.EmployeeFeature.Commands;
using API.src.Application.Features.EmployeeFeature.Querries;
using API.src.Application.Mappings;
using API.src.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.src.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IMediator _mediator;

        public EmployeeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<EmployeeDto[]>> GetEmployees()
        {
            var query = new GetEmployeesQuery();
            var employees = await _mediator.Send(query);

            if (employees != null)
            {
                return Ok(employees.Select(employee => employee.ToEmployeeDto()).ToArray());
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(int id)
        {
            var query = new GetEmployeeQuery(id);
            var employee = await _mediator.Send(query);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee.ToEmployeeDto());
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(CreateEmployeeDto employeeDto)
        {
            var command = new CreateEmployeeCommand(
                employeeDto.FirstName,
                employeeDto.LastName,
                employeeDto.Email,
                employeeDto.Position
            );

            var employee = await _mediator.Send(command);

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, UpdateEmployeeDto employeeDto)
        {
            try
            {
                var command = new UpdateEmployeeCommand(
                    id,
                    employeeDto.FirstName,
                    employeeDto.LastName,
                    employeeDto.Email,
                    employeeDto.Position
                );

                var updatedEmployee = await _mediator.Send(command);

                if (updatedEmployee == null)
                {
                    return NotFound();
                }

                return CreatedAtAction(nameof(GetEmployee), new { id = updatedEmployee.Id }, updatedEmployee);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var query = new GetEmployeeQuery(id);
            var employee = await _mediator.Send(query);

            if (employee == null)
            {
                return NotFound();
            }

            try
            {
                var command = new DeleteEmployeeCommand(id);
                await _mediator.Send(command);

                return Ok(new { Id = id });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}