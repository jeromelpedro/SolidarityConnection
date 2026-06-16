using Microsoft.OpenApi;
using Microsoft.OpenApi.Models;

namespace Solidarity.Api.Extensions;

public static class SwaggerExtensions
{
    public static IServiceCollection AddSwaggerDocumentation(
        this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();

        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc(
                "v1",
                new OpenApiInfo
                {
                    Title = "Solidarity API",
                    Version = "v1"
                });

            options.AddSecurityDefinition(
                "Bearer",
                new OpenApiSecurityScheme
                {
                    Description =
                        "JWT Authorization using Bearer scheme.",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT"
                });

            options.AddSecurityRequirement(
                new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Scheme = "bearer",
                            Name = "Authorization",
                            In = ParameterLocation.Header,
                            Type = SecuritySchemeType.Http
                        },
                        Array.Empty<string>()
                    }
                });
        });

        return services;
    }

    public static WebApplication UseSwaggerDocumentation(
        this WebApplication app)
    {
        app.UseSwagger();

        app.UseSwaggerUI(options =>
        {
            options.DocumentTitle =
                "Solidarity API";

            options.SwaggerEndpoint(
                "/swagger/v1/swagger.json",
                "Solidarity API V1");
        });

        return app;
    }
}