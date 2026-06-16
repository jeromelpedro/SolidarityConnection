using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Solidarity.Infrastructure.Data;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder =
            new DbContextOptionsBuilder<AppDbContext>();

        optionsBuilder.UseSqlServer(
            "Server=localhost,1433;Database=SolidarityConnectionDb;User Id=sa;Password=Solidarity@123;TrustServerCertificate=True;");

        return new AppDbContext(optionsBuilder.Options);
    }
}