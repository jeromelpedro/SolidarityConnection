import { HeroArt, Icon } from '../components/Illustrations'
import { Card } from '../components/ui'

const TIMELINE = [
  {
    year: '2015',
    title: 'O começo',
    text: 'Um galpão cedido no centro da cidade e doze crianças atendidas no contraturno escolar.',
  },
  {
    year: '2018',
    title: 'Primeira sede própria',
    text: 'Com apoio de doadores recorrentes, inauguramos a sede com cozinha, biblioteca e sala de estudos.',
  },
  {
    year: '2021',
    title: 'Programa de educação digital',
    text: 'Oficinas de tecnologia para adolescentes, com 60 formados no primeiro ano.',
  },
  {
    year: '2026',
    title: 'Plataforma Conexão Solidária',
    text: 'Digitalização da gestão de campanhas e doações, com painel público de transparência.',
  },
]

const VALUES = [
  {
    icon: 'heart',
    title: 'Missão',
    text: 'Acolher e desenvolver crianças e adolescentes em situação de vulnerabilidade, garantindo direitos básicos e oportunidades reais.',
  },
  {
    icon: 'sparkles',
    title: 'Visão',
    text: 'Ser referência em acolhimento com transparência radical, onde cada doador sabe exatamente o destino da sua contribuição.',
  },
  {
    icon: 'shield',
    title: 'Valores',
    text: 'Dignidade, prestação de contas, escuta ativa e compromisso com resultados mensuráveis.',
  },
]

export function About() {
  return (
    <div className="space-y-20 sm:space-y-24">
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="animate-rise space-y-5 text-center lg:text-left">
          <p className="text-xs font-semibold tracking-[0.3em] text-neon uppercase">
            Sobre nós
          </p>

          <h1 className="text-glow text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Cuidar é um trabalho de continuidade
          </h1>

          <p className="mx-auto max-w-xl text-slate-400 lg:mx-0">
            A ONG Esperança Solidária existe para que nenhuma criança precise
            escolher entre estudar e comer. Atuamos com acolhimento diário,
            reforço escolar, alimentação e apoio às famílias — e prestamos contas
            de cada real recebido.
          </p>
        </div>

        <div className="flex justify-center">
          <HeroArt className="w-full max-w-xs lg:max-w-md" />
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {VALUES.map((value) => (
          <Card key={value.title} className="glass-hover space-y-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-neon/20 to-violet/20 text-neon">
              <Icon name={value.icon} className="h-5 w-5" />
            </span>

            <h2 className="font-semibold text-white">{value.title}</h2>

            <p className="text-sm text-slate-400">{value.text}</p>
          </Card>
        ))}
      </section>

      <section className="space-y-10">
        <header className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-violet uppercase">
            Nossa trajetória
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            De doze crianças a uma rede de apoio
          </h2>
        </header>

        <ol className="relative space-y-6 border-l border-white/10 pl-6 sm:pl-8">
          {TIMELINE.map((item) => (
            <li key={item.year} className="relative">
              <span className="absolute top-2 -left-[31px] h-3 w-3 rounded-full bg-neon shadow-[0_0_10px_2px_rgba(34,211,238,0.6)] sm:-left-[39px]" />

              <Card className="glass-hover space-y-2">
                <span className="text-sm font-bold text-neon">{item.year}</span>

                <h3 className="font-semibold text-white">{item.title}</h3>

                <p className="text-sm text-slate-400">{item.text}</p>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section className="glass space-y-4 rounded-3xl px-6 py-10 text-center sm:px-12">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Transparência não é promessa, é processo
        </h2>

        <p className="mx-auto max-w-2xl text-sm text-slate-400 sm:text-base">
          Toda doação recebida é registrada individualmente e o valor arrecadado
          de cada campanha é publicado no painel público, atualizado
          automaticamente após a confirmação do pagamento.
        </p>
      </section>
    </div>
  )
}
