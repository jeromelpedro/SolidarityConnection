using Solidarity.Domain.Enums;

namespace Solidarity.Application.DTOs.Campaigns;

public class CampaignResponse
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public decimal FinancialGoal { get; set; }

    public decimal TotalRaised { get; set; }

    public CampaignStatus Status { get; set; }
}