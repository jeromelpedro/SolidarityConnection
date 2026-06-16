using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Solidarity.Application.DTOs.Donations;
using Solidarity.Domain.Documents;
using Solidarity.Domain.Enums;
using Solidarity.Infrastructure.Data;
using Solidarity.Shared.Events;

namespace Solidarity.Api.Controllers;

[ApiController]
[Route("api/donations")]
public class DonationController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IDonationRepository _repository;
    private readonly IMessagePublisher _publisher;

    public DonationController(
        AppDbContext context,
        IDonationRepository repository,
        IMessagePublisher publisher)
    {
        _context = context;
        _repository = repository;
        _publisher = publisher;
    }

    [HttpPost]
    [Authorize(Roles = "Donor")]
    public async Task<IActionResult> Create(
        CreateDonationRequest request)
    {
        var campaign = await _context.Campaigns
            .FirstOrDefaultAsync(x =>
                x.Id == request.CampaignId);

        if (campaign is null)
            return NotFound("Campaign not found.");

        if (campaign.Status != CampaignStatus.Active)
            return BadRequest(
                "Campaign is not active.");

        var donorId =
            Guid.Parse(
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier)!);

        var donation = new Donation
        {
            CampaignId = request.CampaignId,
            DonorId = donorId,
            Amount = request.Amount,
            CreatedAt = DateTime.UtcNow
        };

        await _repository.CreateAsync(donation);

        await _publisher.PublishAsync(
            new DonationReceivedEvent
            {
                CampaignId = request.CampaignId,
                Amount = request.Amount
            });

        return Accepted();
    }
}