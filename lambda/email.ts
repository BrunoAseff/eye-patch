import type { Target } from './targets';

export function Email({ target }: { target: Target }) {
  const now = new Date();
  const formattedDate = now.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Sao_Paulo',
  });

  return `
    ${target.name} esta fora do ar!

    Tipo: ${target.type}
    Nome: ${target.name}
    Url: ${target.url}
    Data: ${formattedDate}

    `;
}
