using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Solidarity.Domain.Documents;

public class DonationRepository : IDonationRepository
{
    private readonly IMongoCollection<Donation> _collection;

    public DonationRepository(IConfiguration configuration)
    {
        var client = new MongoClient(
            configuration["MongoDb:ConnectionString"]);

        var database =
            client.GetDatabase(
                configuration["MongoDb:DatabaseName"]);

        _collection =
            database.GetCollection<Donation>(
                "donations");
    }

    public async Task CreateAsync(Donation donation)
    {
        await _collection.InsertOneAsync(donation);
    }
}