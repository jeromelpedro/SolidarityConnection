using Microsoft.EntityFrameworkCore;
using Solidarity.Infrastructure.Data;
using Solidarity.Worker;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("SqlServer"));
});

builder.Services.AddHostedService<Worker>();

var host = builder.Build();

host.Run();