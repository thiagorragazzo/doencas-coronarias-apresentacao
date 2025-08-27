# Apresentação: Doenças Coronarianas (CID-10 I20-I25)

## 📚 Projeto de Extensão V - Turma 5º Semestre B

### 🌐 Visualizar Online
A apresentação está disponível em: [Em breve - Cloudflare Pages]

### 📋 Sobre o Projeto
Apresentação acadêmica interativa sobre Doenças Coronarianas, abordando:
- **I21**: Infarto Agudo do Miocárdio (IAM)
- **I22**: IAM Recorrente
- **I23**: Complicações pós-IAM
- **I24**: Outras Isquemias Agudas
- **I25**: Doença Isquêmica Crônica
- **Prevenção**: Metas DCNT 2030

### 🚀 Como Publicar no Cloudflare Pages

#### Opção 1: Via Dashboard do Cloudflare (Recomendado)
1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com/)
2. Vá para **Workers & Pages** → **Create application** → **Pages**
3. Conecte sua conta GitHub
4. Selecione o repositório: `doencas-coronarias-apresentacao`
5. Configure:
   - **Project name**: `doencas-coronarias`
   - **Production branch**: `main`
   - **Build command**: (deixe vazio - não precisa build)
   - **Build output directory**: `/` (raiz)
6. Clique em **Save and Deploy**

#### Opção 2: Via Cloudflare CLI (Wrangler)
```bash
# Instalar Wrangler (se não tiver)
npm install -g wrangler

# Login no Cloudflare
wrangler login

# Deploy direto
npx wrangler pages deploy . --project-name=doencas-coronarias
```

### 📱 Funcionalidades
- ✅ Navegação por teclado (←/→)
- ✅ Menu de slides interativo
- ✅ Modo tela cheia
- ✅ Responsivo para mobile
- ✅ Indicador de progresso
- ✅ Swipe em dispositivos touch

### 🎯 Navegação
- **Setas ←/→**: Navegar entre slides
- **M**: Abrir/fechar menu
- **F**: Tela cheia
- **1-9, 0**: Ir direto para slide (0 = slide 10)
- **ESC**: Sair da tela cheia

### 📊 Conteúdo Técnico
Baseado em:
- Harrison's Principles of Internal Medicine, 21ª ed.
- 4ª Definição Universal de IAM (2018)
- Diretrizes ESC/ACC 2022-2023
- Plano de Ações Estratégicas DCNT Brasil 2021-2030

### 🔗 Links Úteis
- **Repositório GitHub**: [github.com/thiagorragazzo/doencas-coronarias-apresentacao](https://github.com/thiagorragazzo/doencas-coronarias-apresentacao)
- **Visualizar Local**: Abra `index.html` no navegador

### 📝 Licença
Material educacional - Projeto de Extensão V

---
*Desenvolvido para fins acadêmicos - 27/08/2025*