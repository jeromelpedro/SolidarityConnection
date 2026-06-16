using Microsoft.AspNetCore.Authentication.JwtBearer;
using Solidarity.Infrastructure.Data;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Solidarity.Api.Extensions;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerDocumentation();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

builder.Services.AddScoped<IDonationRepository, DonationRepository>();
builder.Services.AddScoped<IMessagePublisher, RabbitMqPublisher>();

builder.Services.AddAuthorization();

builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddJwtAuthentication(builder.Configuration);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider
        .GetRequiredService<AppDbContext>();

    db.Database.Migrate();

    await DbSeeder.SeedAsync(db);
}

//if (app.Environment.IsDevelopment())
//{
//    app.UseSwaggerDocumentation();
//}

app.UseSwaggerDocumentation();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

