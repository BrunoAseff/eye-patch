import type { Target } from './types';

export const targets: Target[] = [
  {
    label: 'flaira-api',
    type: 'api',
    name: 'Flaira',
    url: 'https://api.flaira.net/status',
  },
  {
    label: 'flaira-web',
    type: 'web',
    name: 'Flaira',
    url: 'https://flaira.net',
  },
  {
    label: 'portfolio',
    type: 'web',
    name: 'Portfólio',
    url: 'https://brunoaseff.com.br',
  },
  {
    label: 'nova',
    type: 'web',
    name: 'Nova',
    url: 'https://novaspaces.io',
  },
] as const;
