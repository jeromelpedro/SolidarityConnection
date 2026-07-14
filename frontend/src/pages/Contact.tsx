import { useState } from 'react'
import { Icon } from '../components/Illustrations'
import { Alert, Button, Card, Field } from '../components/ui'

const CHANNELS = [
  {
    icon: 'users',
    title: 'Seja voluntário',
    text: 'Doe seu tempo em oficinas, reforço escolar ou apoio administrativo.',
    detail: 'voluntariado@esperancasolidaria.org',
  },
  {
    icon: 'handshake',
    title: 'Parcerias institucionais',
    text: 'Empresas e coletivos que queiram apoiar campanhas específicas.',
    detail: 'parcerias@esperancasolidaria.org',
  },
  {
    icon: 'shield',
    title: 'Prestação de contas',
    text: 'Solicite relatórios financeiros e documentos da organização.',
    detail: 'transparencia@esperancasolidaria.org',
  },
]

export function Contact() {
  const [sent, setSent] = useState(false)

  function submit(event: React.FormEvent) {
    event.preventDefault()

    // Formulario ilustrativo: nao existe endpoint de contato na API.
    setSent(true)
  }

  return (
    <div className="space-y-14">
      <header className="mx-auto max-w-2xl space-y-3 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] text-neon uppercase">
          Contato
        </p>

        <h1 className="text-glow text-3xl font-bold text-white sm:text-4xl">
          Vamos conversar
        </h1>

        <p className="text-slate-400">
          Dúvidas, parcerias ou vontade de ajudar de outra forma? Fale com a
          gente.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
          {CHANNELS.map((channel) => (
            <Card key={channel.title} className="glass-hover space-y-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon/20 to-violet/20 text-neon">
                <Icon name={channel.icon} className="h-4 w-4" />
              </span>

              <h2 className="font-semibold text-white">{channel.title}</h2>

              <p className="text-sm text-slate-400">{channel.text}</p>

              <p className="text-xs break-all text-neon">{channel.detail}</p>
            </Card>
          ))}
        </div>

        <Card className="animate-rise h-fit space-y-4">
          <h2 className="font-semibold text-white">Envie uma mensagem</h2>

          {sent ? (
            <Alert
              kind="success"
              message="Mensagem recebida! Nossa equipe responde em até 2 dias úteis."
            />
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <Field id="contact-name" label="Nome" required />

              <Field id="contact-email" label="E-mail" type="email" required />

              <label htmlFor="contact-message" className="block space-y-1.5">
                <span className="text-xs font-medium tracking-wide text-slate-400 uppercase">
                  Mensagem
                </span>

                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/12 bg-void/60 px-4 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-neon/60 focus:ring-2 focus:ring-neon/25"
                />
              </label>

              <Button type="submit" className="w-full">
                Enviar mensagem
              </Button>
            </form>
          )}

          <p className="text-xs text-slate-600">
            Atendimento de segunda a sexta, das 9h às 18h.
          </p>
        </Card>
      </div>
    </div>
  )
}
