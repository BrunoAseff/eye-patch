import type { Target } from './types';

export const targets: Target[] = [
  {
    type: 'api',
    name: 'Flaira',
    url: 'https://api.flaira.net/status',
  },
  {
    type: 'web',
    name: 'Flaira',
    url: 'https://flaira.net',
  },
  {
    type: 'web',
    name: 'Portfólio',
    url: 'https://brunoaseff.com.br',
  },
  {
    type: 'web',
    name: 'Nova',
    url: 'https://novaspaces.io',
  },
] as const;
