# 🆓 Hospedagem Gratuita para Paper World (com Download Direto)

## ✅ Melhores Opções Gratuitas

### 🥇 **1. Render.com** (RECOMENDADO)
**Por que:** Mais fácil, 750 horas gratis/mês

**Plano Free:**
- ✅ Node.js suportado
- ✅ 750 horas/mês (suficiente)
- ✅ Deploy automático do GitHub
- ⚠️ "Hiberna" após 15min sem uso (1º acesso demora ~30s)

**Como fazer:**
1. Acesse https://render.com
2. Cadastre com GitHub
3. "New" → "Web Service"
4. Conecte repositório `paper-world`
5. Configurações:
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment: `Node`
6. Deploy!

**URL final:** `https://paper-world-xxx.onrender.com`

---

### 🥈 **2. Railway.app**
**Por que:** $5 grátis/mês (suficiente para baixo tráfego)

**Plano Free Trial:**
- ✅ $5 crédito gratuito
- ✅ Não hiberna
- ✅ Deploy super rápido

**Como fazer:**
1. Acesse https://railway.app
2. Login com GitHub
3. "New Project" → "Deploy from GitHub"
4. Selecione `paper-world`
5. Railway detecta Node.js automaticamente
6. Deploy!

---

### 🥉 **3. Cyclic.sh**
**Por que:** Totalmente grátis, sem hibernar

**Plano Free:**
- ✅ 100% grátis
- ✅ Não hiberna
- ✅ Deploy GitHub automático

**Como fazer:**
1. Acesse https://cyclic.sh
2. Login com GitHub
3. "Link Your Own" → Selecione `paper-world`
4. Deploy automático!

---

### 🎯 **4. Vercel (Serverless Alternative)**
**Por que:** Você já conhece, mas precisa adaptar código

**Limitação:** Não roda `server.js` normal, precisa de funções serverless

**Solução:** Converter para Vercel Functions (similar ao Netlify que tentamos)

---

## 🚀 Minha Recomendação

**Use Render.com:**
1. Mais fácil de configurar
2. Funciona com seu `server.js` atual
3. Não precisa mudar nada no código
4. 750h/mês é suficiente

**Único "problema":** Hiberna após 15min inativo
- 1º visitante: espera ~30s para "acordar"
- Depois: rápido normalmente

---

## 📝 Arquivos Necessários

Seu repositório GitHub JÁ TEM tudo:
- ✅ `server.js`
- ✅ `package.json`
- ✅ `index.html`, `hub.html`, `styles.css`, `app.js`
- ✅ `checkpoint.json`

**Só precisa adicionar um arquivo:**

### `package.json` - Start Script
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

Mas você já tem! Só precisa fazer deploy!

---

## 🎨 Quer que eu faça?

**Opção A:** Te guio passo a passo no Render.com agora

**Opção B:** Deixo abrir página do cubee (1 clique) e você usa Netlify

Qual prefere?
