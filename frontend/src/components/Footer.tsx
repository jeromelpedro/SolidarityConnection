import { Link } from 'react-router-dom'
import { Icon } from './Illustrations'

const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? '1.0.0'

const NAV = [
  { to: '/campanhas', label: 'Campanhas ativas' },
  { to: '/sobre', label: 'Sobre a ONG' },
  { to: '/contato', label: 'Contato' },
  { to: '/cadastro', label: 'Seja um doador' },
]

export function Footer() {
  return (
    <footer className="glass mt-24 border-x-0 border-b-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-neon shadow-[0_0_12px_3px_rgba(34,211,238,0.7)]" />

            <span className="text-lg font-bold text-white">
              Conexão Solidária
            </span>
          </div>

          <p className="max-w-xs text-sm text-slate-500">
            Plataforma digital da ONG Esperança Solidária. Acolhimento, educação
            e transparência para crianças em situação de vulnerabilidade.
          </p>

          <p className="text-xs text-slate-600">
            CNPJ 12.345.678/0001-90 · Organização sem fins lucrativos
          </p>
        </div>

        <nav className="space-y-3">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
            Navegação
          </h3>

          <ul className="space-y-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-slate-500 transition hover:text-neon"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
            Contato
          </h3>

          <ul className="space-y-2 text-sm text-slate-500">
            <li>Rua das Acácias, 120 — São Paulo/SP</li>
            <li>contato@esperancasolidaria.org</li>
            <li>(11) 4002-8922</li>
          </ul>

          <p className="flex items-center gap-2 pt-2 text-xs text-success">
            <Icon name="shield" className="h-3.5 w-3.5" />
            Doações rastreáveis e auditáveis
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-600 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} ONG Esperança Solidária. Projeto
            acadêmico.
          </p>

          <p>Conexão Solidária · v{APP_VERSION}</p>
        </div>
      </div>
    </footer>
  )
}
