namespace API.src.DTOs
{
    class EmployeeDto
    {
        public string FullName { get; set; } = string.Empty;

        public string? Email { get; set; }

        public string? Position { get; set; }
    }
}