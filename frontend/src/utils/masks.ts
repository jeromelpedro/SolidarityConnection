/** Mascara 000.000.000-00. O backend aceita com ou sem mascara. */
export function maskCpf(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
}

/**
 * Mascara monetaria no padrao pt-BR (1.234,56).
 * O usuario digita apenas numeros; os dois ultimos digitos sao os centavos.
 */
export function maskMoney(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 12)

  if (!digits) {
    return ''
  }

  return (Number(digits) / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/** Converte o valor mascarado de volta para numero (1.234,56 -> 1234.56). */
export function parseMoney(masked: string): number {
  const digits = masked.replace(/\D/g, '')

  return digits ? Number(digits) / 100 : 0
}

/** Formata um numero ja conhecido para edicao no campo mascarado. */
export function toMoneyInput(value: number): string {
  return maskMoney(Math.round(value * 100).toString())
}
