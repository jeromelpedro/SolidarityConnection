import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { campaignService } from '../services/campaign.service'
import { CampaignCard } from '../components/CampaignCard'
import { HeroArt, Icon } from '../components/Illustrations'
import { Button, Card, currency } from '../components/ui'
import { useAuth } from '../hooks/useAuth'
import type { ActiveCampaign } from '../types'

/**
 * Conteudo institucional. Os numeros de atuacao historica sao ilustrativos;
 * os indicadores de campanha vem da API (dados reais da plataforma).
 */
const FOUNDED_YEAR = 2015

const PILLARS = [
  {
    icon: 'heart',
    title: 'Acolhimento',
    text: 'Abrigo, alimentação e apoio psicológico para crianças em situação de vulnerabilidade.',
  },
  {
    icon: 'sparkles',
    title: 'Educação',
    text: 'Reforço escolar, oficinas culturais e cursos de tecnologia para adolescentes.',
  },
  {
    icon: 'shield',
    title: 'Transparência',
    text: 'Cada doação é registrada e o valor arrecadado é publicado em tempo real.',
  },
]

const STEPS = [
  {
    title: 'Escolha uma campanha',
    text: 'Veja as campanhas ativas, a meta de cada uma e quanto já foi arrecadado.',
  },
  {
    title: 'Faça sua doação',
    text: 'Cadastre-se em menos de um minuto e contribua com o valor que quiser.',
  },
  {
    title: 'Acompanhe o impacto',
    text: 'Sua contribuição aparece no painel de transparência assim que confirmada.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'Minha filha voltou a estudar com o reforço escolar da ONG. Hoje ela sonha em ser engenheira.',
    author: 'Marta Ribeiro',
    role: 'Mãe atendida pelo programa',
  },
  {
    quote:
      'Doo todo mês e consigo ver exatamente para onde o dinheiro vai. Essa clareza me fez continuar.',
    author: 'Carlos Menezes',
    role: 'Doador desde 2019',
  },
  {
    quote:
      'Como voluntária, vejo de perto o que cada real faz. Não é caridade, é reconstrução de futuro.',
    author: 'Juliana Alves',
    role: 'Voluntária',
  },
]

const PARTNERS = [
  'Instituto Amanhã',
  'Rede Bem Viver',
  'Fundação Horizonte',
  'Coletivo Raízes',
]

export function Home() {
  const { isAuthenticated } = useAuth()

  const [campaigns, setCampaigns] = useState<ActiveCampaign[]>([])

  useEffect(() => {
    campaignService
      .listActive()
      .then(setCampaigns)
      .catch(() => setCampaigns([]))
  }, [])

  const totalRaised = campaigns.reduce(
    (sum, campaign) => sum + campaign.totalRaised,
    0,
  )

  const yearsActive = new Date().getFullYear() - FOUNDED_YEAR

  const metrics = [
    { icon: 'chart', value: currency(totalRaised), label: 'Arrecadado na plataforma' },
    { icon: 'heart', value: String(campaigns.length), label: 'Campanhas ativas' },
    { icon: 'users', value: '1.240', label: 'Crianças atendidas' },
    { icon: 'handshake', value: `${yearsActive}+`, label: 'Anos de atuação' },
  ]

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* ================= HERO ================= */}
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="animate-rise space-y-6 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-neon">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            ONG Esperança Solidária
          </span>

          <h1 className="text-glow text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
            Transformando doações em{' '}
            <span className="bg-gradient-to-r from-neon via-violet to-magenta bg-clip-text text-transparent">
              futuros possíveis
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-base text-slate-400 sm:text-lg lg:mx-0">
            Há mais de {yearsActive} anos acolhemos crianças em situação de
            vulnerabilidade. Agora, com a plataforma Conexão Solidária, você
            acompanha cada real doado — do clique ao impacto.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link to="/campanhas">
              <Button className="w-full sm:w-auto">Quero doar agora</Button>
            </Link>

            {!isAuthenticated && (
              <Link to="/cadastro">
                <Button variant="ghost" className="w-full sm:w-auto">
                  Criar conta de doador
                </Button>
              </Link>
            )}
          </div>

          <p className="text-xs text-slate-600">
            Doação 100% rastreável · Sem taxas · Painel público de transparência
          </p>
        </div>

        <div className="animate-rise flex justify-center">
          <HeroArt className="w-full max-w-sm lg:max-w-lg" />
        </div>
      </section>

      {/* ================= MÉTRICAS ================= */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card
            key={metric.label}
            className="glass-hover flex flex-col items-center gap-2 p-5 text-center sm:p-6"
          >
            <Icon name={metric.icon} className="h-6 w-6 text-neon" />

            <p className="text-xl font-bold text-white sm:text-3xl">
              {metric.value}
            </p>

            <p className="text-xs text-slate-500 sm:text-sm">{metric.label}</p>
          </Card>
        ))}
      </section>

      {/* ================= SOBRE ================= */}
      <section id="sobre" className="scroll-mt-24 space-y-10">
        <header className="mx-auto max-w-3xl space-y-3 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-neon uppercase">
            Quem somos
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Uma década reconstruindo histórias
          </h2>

          <p className="text-slate-400">
            Nascemos em {FOUNDED_YEAR}, em um galpão cedido no centro da cidade, atendendo
            doze crianças. Hoje somos uma rede de acolhimento, educação e cuidado —
            sustentada por pessoas que acreditam que ninguém deveria crescer sozinho.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Card key={pillar.title} className="glass-hover space-y-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-neon/20 to-violet/20 text-neon">
                <Icon name={pillar.icon} className="h-5 w-5" />
              </span>

              <h3 className="font-semibold text-white">{pillar.title}</h3>

              <p className="text-sm text-slate-400">{pillar.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= COMO FUNCIONA ================= */}
      <section id="como-ajudar" className="scroll-mt-24 space-y-10">
        <header className="mx-auto max-w-3xl space-y-3 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-violet uppercase">
            Como ajudar
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Três passos até o impacto
          </h2>
        </header>

        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <Card key={step.title} className="glass-hover space-y-3">
              <span className="text-glow text-3xl font-bold text-neon/40">
                0{index + 1}
              </span>

              <h3 className="font-semibold text-white">{step.title}</h3>

              <p className="text-sm text-slate-400">{step.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= CAMPANHAS ================= */}
      {campaigns.length > 0 && (
        <section className="space-y-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.3em] text-neon uppercase">
                Campanhas ativas
              </p>

              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Onde sua doação vai agora
              </h2>
            </div>

            <Link to="/campanhas">
              <Button variant="ghost" className="w-full sm:w-auto">
                Ver todas
              </Button>
            </Link>
          </header>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.slice(0, 3).map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign}>
                <Link to="/campanhas" className="block">
                  <Button className="w-full">Doar para esta campanha</Button>
                </Link>
              </CampaignCard>
            ))}
          </div>
        </section>
      )}

      {/* ================= DEPOIMENTOS ================= */}
      <section className="space-y-10">
        <header className="mx-auto max-w-3xl space-y-3 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-magenta uppercase">
            Depoimentos
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Quem vive essa história
          </h2>
        </header>

        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <Card key={item.author} className="glass-hover flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-slate-300 italic">
                “{item.quote}”
              </p>

              <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neon to-violet text-sm font-bold text-void">
                  {item.author.charAt(0)}
                </span>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {item.author}
                  </p>

                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= PARCEIROS ================= */}
      <section className="space-y-6">
        <p className="text-center text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">
          Parceiros institucionais
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {PARTNERS.map((partner) => (
            <div
              key={partner}
              className="glass flex items-center justify-center rounded-xl px-4 py-5 text-center text-xs font-semibold tracking-wide text-slate-500 sm:text-sm"
            >
              {partner}
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="glass relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-neon/20 blur-[100px]" />

        <div className="relative space-y-6">
          <h2 className="text-glow text-3xl font-bold text-white sm:text-4xl">
            Sua doação começa hoje
          </h2>

          <p className="mx-auto max-w-2xl text-slate-400">
            Você escolhe a campanha, doa em segundos e acompanha o valor
            arrecadado sendo atualizado em tempo real. Simples, aberto e auditável.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/campanhas">
              <Button className="w-full sm:w-auto">Ver campanhas</Button>
            </Link>

            <Link to="/cadastro">
              <Button variant="ghost" className="w-full sm:w-auto">
                Quero ser doador
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
