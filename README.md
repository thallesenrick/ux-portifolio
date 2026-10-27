# Portf?lio de Thalles Enrick

Portf?lio desenvolvido com React, TypeScript, Vite e Tailwind CSS. Inclui p?ginas de in?cio, sobre, projetos e contato, com temas claro/escuro e idiomas portugu?s/ingl?s.

## Desenvolvimento

Requer Node.js 20.19+ ou 22.12+.

- `npm ci`: instala as depend?ncias do lockfile.
- `npm run dev`: inicia o servidor local; o terminal informa a porta dispon?vel.
- `npm run build`: verifica os tipos e gera o site em `dist/`.
- `npm run preview`: serve o build localmente.
- `npm run lint`: verifica o c?digo com ESLint.

## Estrutura

- `src/pages`: p?ginas das rotas.
- `src/components`: navega??o, anima??es e componentes das p?ginas.
- `src/lib`: providers, contextos e tradu??es.
- `src/assets`: imagens e SVGs importados pelo Vite.

O formul?rio de contato ? demonstrativo e n?o envia mensagens. Os links de download e os bot?es de cases ainda precisam de destinos reais.

## Selected projects

Six-project carousel with four compact queue cards in a 2x2 grid. The fifth queued project rotates into view on the next selection; the desktop carousel keeps a 400px height. Three additional concept projects are placeholders for real portfolio content. Each image plays for four seconds; after the gallery ends, the next project becomes featured. Selecting a queue card resets the timer. Pause, previous/next and photo controls are available. Playback pauses on hover, keyboard focus, hidden tabs and offscreen; reduced motion defaults to manual playback. Home sections alternate left/right entrance animations on scroll. Concept previews are labeled.

React Bits source and license: src/components/react-bits/.
