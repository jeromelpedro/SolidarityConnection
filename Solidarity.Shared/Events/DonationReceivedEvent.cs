namespace Solidarity.Shared.Events;

public class DonationReceivedEvent
{
    public Guid CampaignId { get; set; }

    public decimal Amount { get; set; }
}