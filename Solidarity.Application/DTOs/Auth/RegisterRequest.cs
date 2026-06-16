namespace Solidarity.Application.DTOs.Auth;

public class RegisterRequest
{
    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Cpf { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}