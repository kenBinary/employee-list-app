using System.ComponentModel.DataAnnotations;

namespace API.src.Application.DTOs;

public class UpdateEmployeeDto
{
    [Required]
    [StringLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string LastName { get; set; } = string.Empty;

    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    [StringLength(100)]
    public string? Position { get; set; }
}