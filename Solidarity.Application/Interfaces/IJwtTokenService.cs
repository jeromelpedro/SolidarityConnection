using Solidarity.Domain.Entities;

public interface IJwtTokenService
{
    string Generate(User user);
}