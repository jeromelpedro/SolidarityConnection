using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Solidarity.Domain.Entities;

namespace Solidarity.Infrastructure.Data.Configurations;

public class CampaignConfiguration : IEntityTypeConfiguration<Campaign>
{
    public void Configure(EntityTypeBuilder<Campaign> builder)
    {
        builder.ToTable("Campaigns");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.Description)
            .HasMaxLength(1000)
            .IsRequired();

        builder.Property(x => x.FinancialGoal)
            .HasPrecision(18, 2);

        builder.Property(x => x.TotalRaised)
            .HasPrecision(18, 2);
    }
}