# 🚀 Deploy no Render.com (GRÁTIS)

## ✅ Por que Render.com?
- ✅ 750 horas/mês GRÁTIS
- ✅ Deploy automático do GitHub
- ✅ Node.js suportado
- ✅ Download direto funciona!
- ⚠️ Hiberna após 15min inativo (primeiro acesso demora ~30s para acordar)

---

## 📋 Passo a Passo

### 1. Criar Conta
1. Acesse: https://render.com
2. Clique em **"Get Started"**
3. Escolha **"Sign in with GitHub"**
4. Autorize Render a acessar seus repositórios

### 2. Criar Web Service
1. No dashboard, clique em **"New +"** (canto superior direito)
2. Escolha **"Web Service"**
3. Clique em **"Connect account"** para conectar GitHub (se necessário)
4. Encontre **"paper-world"** na lista
5. Clique em **"Connect"**

### 3. Configurar Service
Preencha os campos:

- **Name:** `paper-world` (ou qualquer nome)
- **Region:** `Frankfurt (EU Central)` (mais perto do Brasil)
- **Branch:** `main`
- **Root Directory:** deixe vazio
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### 4. Plano Free
- Role até **"Instance Type"**
- Selecione **"Free"** (não precisa cartão!)

### 5. Deploy!
- Clique em **"Create Web Service"** no final da página
- Aguarde 2-3 minutos (vai instalar dependências e iniciar)

---

## 🎉 Pronto!

Você vai receber uma URL tipo:
```
https://paper-world.onrender.com
```

**Teste:**
1. Acesse a URL
2. Faça login (qualquer email)
3. Clique em "Download PDF"
4. **Deve baixar direto!** 🎨✨

---

## ⚙️ Configurações Importantes

### Auto-Deploy
Render faz deploy automático quando você faz `git push`!

### Logs
- Clique em "Logs" para ver o que está acontecendo
- Útil se algo der errado

### Hibernação
- Após 15min sem visitas, hiberna
- Primeiro acesso depois disso demora ~30s
- Depois volta ao normal

---

## 🐛 Se der erro:

### "Deploy failed"
- Verifique os Logs
- Certifique-se que `package.json` tem `"start": "node server.js"`

### "Application error"
- Abra os Logs no Render
- Pode ser porta errada (Render usa variável PORT)

---

## 🎯 Alternativas se Render não funcionar:

1. **Railway.app** - $5 grátis/mês
2. **Glitch.com** - 100% grátis
3. **Replit** - grátis mas repositório fica público

Mas Render é a melhor opção! 🚀
