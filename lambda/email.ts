import type { Target } from './targets';

type EmailData = {
  target: Target;
  httpStatus?: number | null;
  error?: Error | null;
};

export function Email({ target, httpStatus, error }: EmailData) {
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
${target.name} está fora do ar.

Tipo: ${target.type}
Nome: ${target.name}
URL: ${target.url}
Data: ${formattedDate}

${httpStatus ? `Status HTTP: ${httpStatus}` : ''}
${error ? `Erro: ${typeof error === 'string' ? error : JSON.stringify(error)}` : ''}
`.trim();
}
