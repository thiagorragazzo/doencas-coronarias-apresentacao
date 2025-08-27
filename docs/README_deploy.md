# 🚀 Guia de Deploy - Cloudflare Pages

## Pré-requisitos
- Conta no Cloudflare (gratuita)
- Repositório GitHub já configurado
- Token de API (opcional, para CLI)

## 📋 Deploy via Dashboard (Recomendado)

### Passo 1: Acessar Cloudflare Dashboard
1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com/)
2. Faça login com sua conta

### Passo 2: Criar novo projeto Pages
1. Navegue para **Workers & Pages** no menu lateral
2. Clique em **Create application**
3. Selecione **Pages**
4. Clique em **Connect to Git**

### Passo 3: Conectar GitHub
1. Autorize o Cloudflare a acessar seu GitHub
2. Selecione o repositório: `doencas-coronarias-apresentacao`
3. Clique em **Begin setup**

### Passo 4: Configurar build
```yaml
Project name: doencas-coronarias
Production branch: main
Build command: (deixe vazio)
Build output directory: /
Root directory: /
Environment variables: (nenhuma necessária)
```

### Passo 5: Deploy
1. Clique em **Save and Deploy**
2. Aguarde o processo (1-2 minutos)
3. Acesse sua URL: `https://doencas-coronarias.pages.dev`

## 🔧 Deploy via CLI (Alternativo)

### Instalação do Wrangler
```bash
npm install -g wrangler
```

### Login
```bash
wrangler login
```

### Deploy direto
```bash
# Na pasta do projeto
cd /Users/thiagoragazzo/slides_projeto_extensão_V

# Deploy
npx wrangler pages deploy . \
  --project-name=doencas-coronarias \
  --branch=main
```

## 📦 Arquivos de Configuração

### _headers (opcional)
Crie um arquivo `_headers` na raiz:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Cache-Control: public, max-age=3600

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/*.pdf
  Cache-Control: public, max-age=86400

/*.pptx
  Content-Disposition: attachment
```

### _redirects (opcional)
Crie um arquivo `_redirects` para redirecionamentos:
```
# Redirecionar raiz para index
/  /index.html  200
```

## 🔄 Atualizações Automáticas

Após a configuração inicial, cada push para o branch `main` no GitHub:
1. Triggera automaticamente um novo build
2. Deploy em 1-2 minutos
3. URL de preview para branches não-main

## 📊 Monitoramento

### Analytics
1. No dashboard do Cloudflare Pages
2. Acesse seu projeto
3. Aba **Analytics** mostra:
   - Visualizações
   - Visitantes únicos
   - Banda utilizada
   - Status codes

### Web Analytics (opcional)
1. Adicione o snippet ao `index.html`:
```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "SEU_TOKEN_AQUI"}'></script>
```

## 🌐 Domínio Customizado (opcional)

### Adicionar domínio próprio
1. No projeto Pages, vá em **Custom domains**
2. Clique **Add domain**
3. Digite seu domínio: `apresentacao.seudominio.com`
4. Configure DNS:
   - CNAME: `apresentacao` → `doencas-coronarias.pages.dev`

## 🔐 Variáveis de Ambiente

Não são necessárias para este projeto, mas se precisar:
1. Settings → Environment variables
2. Add variable
3. Disponível durante build como `process.env.VARIAVEL`

## 🆘 Troubleshooting

### Build falhou
- Verifique se todos os arquivos estão commitados
- Confirme que não há paths absolutos locais

### 404 em assets
- Certifique-se que paths são relativos
- Verifique case-sensitive em nomes de arquivos

### Performance lenta
- Ative cache headers
- Use Cloudflare CDN para assets

## 📝 Checklist de Deploy

- [ ] Repositório GitHub atualizado
- [ ] Branch main protegido
- [ ] Teste local funcionando
- [ ] PDF/PPTX gerados
- [ ] Screenshots criados
- [ ] README atualizado
- [ ] Deploy no Cloudflare Pages
- [ ] URL funcionando
- [ ] Analytics configurado (opcional)
- [ ] Domínio customizado (opcional)

## 🔗 URLs Importantes

- **Produção:** https://doencas-coronarias.pages.dev
- **GitHub:** https://github.com/thiagorragazzo/doencas-coronarias-apresentacao
- **Dashboard:** https://dash.cloudflare.com/?to=/:account/pages/view/doencas-coronarias

## 📞 Suporte

- [Documentação Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Status Cloudflare](https://www.cloudflarestatus.com/)
- [Community Forum](https://community.cloudflare.com/)

---
*Última atualização: 27/08/2025*