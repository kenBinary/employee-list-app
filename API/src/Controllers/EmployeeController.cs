using Api.src.Mapper;
using API.src.DTOs;
using API.src.Models;
using API.src.Repository;
using Microsoft.AspNetCore.Mvc;

namespace API.src.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{

    private readonly IEmployeeRepository _repository;

    public EmployeeController(IEmployeeRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployees()
    {
        var employees = await _repository.GetEmployees();

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

        var employee = await _repository.GetEmployee(id);

        if (employee == null)
        {
            return NotFound();
        }

        return Ok(employee.ToEmployeeDto());
    }

    [HttpPost]
    public async Task<ActionResult<Employee>> CreateEmployee(CreateEmployeeDto employeeDto)
    {

        var employee = new Employee
        {
            FirstName = employeeDto.FirstName,
            LastName = employeeDto.LastName,
            Email = employeeDto.Email,
            Position = employeeDto.Position,
        };

        var addedEmployee = await _repository.AddEmployee(employee);

        return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(int id, UpdateEmployeeDto employeeDto)
    {

        try
        {
            var newEmployee = await _repository.UpdateEmployee(id, employeeDto);

            if (newEmployee == null)
            {
                return NotFound();
            }

            return CreatedAtAction(nameof(GetEmployee), new { id = newEmployee.Id }, newEmployee);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {

        var employee = await _repository.GetEmployee(id);
        if (employee == null)
        {
            return NotFound();
        }

        try
        {
            await _repository.RemoveEmployee(id);
            return Ok(new
            {
                Id = id
            });
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

    }
}