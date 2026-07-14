import type { ReactNode } from 'react'
import { ProgressBar } from './ProgressBar'
import { Card, currency } from './ui'
import type { ActiveCampaign } from '../types'

interface CampaignCardProps {
  campaign: ActiveCampaign
  pending?: boolean
  children?: ReactNode
}

export function CampaignCard({
  campaign,
  pending = false,
  children,
}: CampaignCardProps) {
  return (
    <Card className="glass-hover animate-rise flex h-full flex-col gap-4 sm:gap-5">
      <h3 className="text-base font-semibold text-white sm:text-lg">
        {campaign.title}
      </h3>

      <div className="space-y-1">
        <p className="text-xl font-bold text-neon sm:text-2xl">
          {currency(campaign.totalRaised)}
        </p>

        <p className="text-xs text-slate-500">
          de {currency(campaign.financialGoal)} de meta
        </p>
      </div>

      <ProgressBar
        raised={campaign.totalRaised}
        goal={campaign.financialGoal}
        pending={pending}
      />

      {/* Acoes variam conforme a tela e o perfil do usuario. */}
      {children && <div className="mt-auto space-y-3">{children}</div>}
    </Card>
  )
}
