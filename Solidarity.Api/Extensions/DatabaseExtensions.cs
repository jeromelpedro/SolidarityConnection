using Microsoft.EntityFrameworkCore;
using Solidarity.Infrastructure.Data;

namespace Solidarity.Api.Extensions;

public static class DatabaseExtensions
{
    public static IServiceCollection AddDatabase(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlServer(
                configuration.GetConnectionString(
                    "SqlServer"));
        });

        return services;
    }
}