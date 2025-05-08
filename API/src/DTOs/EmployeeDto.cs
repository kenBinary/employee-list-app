namespace API.src.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string? Email { get; set; }

        public string? Position { get; set; }
    }
}