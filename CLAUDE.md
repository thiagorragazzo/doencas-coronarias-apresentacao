# CLAUDE.md — Convenções do projeto DCNT (slides HTML → PDF/PPTX)

## Objetivos
- Renderização consistente (HTML/CSS/JS) + A11y básica
- Exportação determinística para PDF (1280×720) e PPTX (PptxGenJS com metatags)
- Deploy via Cloudflare Pages (GitHub)

## Regras de execução
- Planejar → executar por etapas; propor suposições quando algo não bloquear
- Saída sempre: Resumo • Checklist • Comandos • JSON
- Não expor segredos; não publicar automaticamente

## Padrões técnicos
- HTML lint: html-validate ; Format: Prettier
- Fonts offline: Inter, Roboto Slab (fonts/ + @font-face), fallback Arial
- CDN: versões fixadas + SRI; imagens com alt; contraste ≥ 4.5:1
- Export: Puppeteer (PDF), PptxGenJS (PPTX) lendo metatags (slide-number, slide-layout, pptx-transition, harrison-validated)
- Screenshots: dist/screenshots/slide-XX.png

## Scripts npm
- "dev": "http-server -p 4173 -c-1"
- "lint": "html-validate \"**/*.html\""  
- "fmt": "prettier -w \"**/*.{html,css,js}\""
- "export:pdf": "node scripts/export-pdf.js"
- "export:pptx": "node scripts/export-pptx.js"
- "export:all": "npm run export:pdf && npm run export:pptx"

## Checklist de conformidade
- [ ] Sem erros em console
- [ ] html-validate: 0 erros
- [ ] Imagens com alt
- [ ] CDN pin + SRI + fonts offline
- [ ] PDF e PPTX gerados em /dist
- [ ] README_deploy.md criado

## Estrutura de diretórios
```
/slides_projeto_extensão_V
├── index.html
├── Slide_01.html ... Slide_10.html
├── package.json
├── fonts/           # Fontes offline
├── scripts/         # Scripts de exportação
│   ├── export-pdf.js
│   └── export-pptx.js
├── dist/            # Artefatos gerados
│   ├── slides.pdf
│   ├── slides.pptx
│   └── screenshots/
└── docs/
    ├── qa-report.md
    └── README_deploy.md
```

## Saída estruturada padrão
```json
{
  "status": "ok|warnings|failed",
  "pdf": "dist/slides.pdf",
  "pptx": "dist/slides.pptx",
  "screenshots": "dist/screenshots/",
  "lint": {"html": "..."},
  "accessibility": {"contrastIssues": 0, "missingAlt": 0},
  "links": {"broken": 0},
  "cdn": {"pinned": true, "sri": true, "fontsOffline": true}
}
```