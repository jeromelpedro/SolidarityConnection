using Solidarity.Domain.Documents;

public interface IDonationRepository
{
    Task CreateAsync(Donation donation);
}