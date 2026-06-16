using Microsoft.Extensions.Configuration;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

public class RabbitMqPublisher : IMessagePublisher
{
    private readonly IConfiguration _configuration;

    public RabbitMqPublisher(
        IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task PublishAsync<T>(T message)
    {
        var factory = new ConnectionFactory
        {
            HostName = _configuration["RabbitMq:Host"]
        };

        using var connection =
            await factory.CreateConnectionAsync();

        using var channel =
            await connection.CreateChannelAsync();

        await channel.QueueDeclareAsync(
            queue: "donation-received",
            durable: true,
            exclusive: false,
            autoDelete: false);

        var body =
            Encoding.UTF8.GetBytes(
                JsonSerializer.Serialize(message));

        await channel.BasicPublishAsync(
            exchange: "",
            routingKey: "donation-received",
            body: body);
    }
}