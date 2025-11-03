import type { Target } from './types';

export const targets: Target[] = [
  {
    label: 'bolhas',
    type: 'web',
    name: 'Bolhas na Mão',
    url: 'https://bolhas.org',
  },
  {
    label: 'ecosystem',
    type: 'web',
    name: 'Simulador de Ecossistema',
    url: 'https://ecosystem.bolhas.org',
  },
  {
    label: 'game-of-life',
    type: 'web',
    name: 'Jogo da Vida',
    url: 'https://gameoflife.bolhas.org',
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
