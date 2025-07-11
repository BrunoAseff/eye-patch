/* eslint-disable no-undef */

import { build } from 'esbuild';

build({
  entryPoints: ['lambda/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  platform: 'node',
  target: 'node18',
  external: ['aws-sdk'],
}).catch(() => process.exit(1));
