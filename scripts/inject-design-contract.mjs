import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { designContract } from '../design-contract.mjs';

const outputPath = resolve('.next/server/app/index.html');
const html = await readFile(outputPath, 'utf8');
const comment = `<!--\n${designContract}\n-->`;

if (!html.includes('THESIS: Axquotes turns market complexity into forward motion')) {
  await writeFile(outputPath, html.replace('<body>', `<body>${comment}`));
}
