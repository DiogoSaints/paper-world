# 🚀 Deploy no GitHub e Netlify (ATUALIZADO)

## 📦 Arquivos para Subir no GitHub

✅ **Arquivos Necessários:**
- `index.html`
- `styles.css`
- `app.js` ⭐ **ATUALIZADO** - Download direto via Netlify Function
- `checkpoint.json`
- `package.json` ⭐ **NOVO** - Dependências para Netlify Functions
- `netlify.toml` ⭐ **NOVO** - Configuração do Netlify
- `netlify/functions/download.js` ⭐ **NOVO** - Função serverless para download
- `README.md`
- `.gitignore`

❌ **NÃO subir:**
- `node_modules/`
- `server.js`
- `scraper*.js`
- `downloader.js`
- `test-download.js`

---

## 🐙 Passos para GitHub

### 1. Inicializar repositório
```bash
git init
git add .
git commit -m "🎨 Paper World - Download direto com Netlify Functions"
```

### 2. Criar repositório no GitHub
- Vá em https://github.com/new
- Nome: `paper-world`
- Descrição: "Explore nosso mundo mágico de papercrafts! 🎨"
- Público
- Clique em "Create repository"

### 3. Conectar e enviar
```bash
git remote add origin https://github.com/SEU-USUARIO/paper-world.git
git branch -M main
git push -u origin main
```

---

## 🚀 Deploy no Netlify

### Deploy Automático (Recomendado)

1. Acesse https://app.netlify.com
2. Clique em "Add new site" → "Import an existing project"
3. Escolha "Deploy with GitHub"
4. Autorize o Netlify
5. Selecione `paper-world`
6. **Configurações:**
   - Build command: (deixe vazio)
   - Publish directory: `.` ou `/`
   - **IMPORTANTE:** O Netlify vai detectar automaticamente o `netlify.toml`
7. Clique em "Deploy site"

⚡ **O Netlify vai:**
- Instalar `node-fetch` automaticamente
- Criar a função serverless em `/.netlify/functions/download`
- Deploy completo em ~2 minutos

---

## ✨ Como Funciona Agora

**Download Direto! 🎉**

1. Usuário clica em "Download PDF"
2. Request vai para `/.netlify/functions/download`
3. Função serverless faz POST para cubeecraft.com
4. PDF baixa direto sem abrir nenhuma página!

**Tecnologia:**
- Netlify Functions (AWS Lambda)
- Download direto via proxy serverless
- Compatível com hospedagem estática

---

## 🌐 Domínio Personalizado

### Opção 1: Subdomínio
`https://paperworld.conectacristo.site`

**DNS (onde você gerencia conectacristo.site):**
- Tipo: `CNAME`
- Nome: `paperworld`
- Valor: `SEU-SITE.netlify.app`

### Opção 2: Subpasta
Para usar `https://www.conectacristo.site/paperworld`:
- Você precisaria de configuração especial no servidor principal
- Recomendo usar subdomínio (mais fácil)

---

## 🔄 Atualizar o Site

Sempre que fizer mudanças:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

O Netlify atualiza automaticamente em ~1 minuto! 🎉

---

## 🧪 Testar Localmente

Para testar as Netlify Functions localmente:

```bash
npm install -g netlify-cli
netlify dev
```

Acesse: `http://localhost:8888`

---

## ✅ Checklist Final

- [ ] Criar repositório no GitHub
- [ ] Push dos arquivos
- [ ] Conectar Netlify ao GitHub
- [ ] Deploy automático
- [ ] Testar downloads (devem funcionar direto!)
- [ ] Configurar domínio personalizado (opcional)

Pronto! Downloads diretos funcionando! 🎨✨
