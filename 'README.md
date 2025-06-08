# 🛍️ Prime Achados - E-commerce com Firebase

-## 🚀 Tecnologias Utilizadas
- **Frontend**: 
  - Next.js 14
  - Tailwind CSS
  - Shadcn/ui (para componentes)
- **Backend**: 
  - Firebase Authentication
  - Firestore Database
  - Firebase Storage
- **Segurança**: 
  - Zod para validação frontend
  - Firebase Security Rules
  - Custom Claims para controle de acesso
- **Produtividade**:
  - GitHub Copilot
  - Amazon Q
  - ChatGPT Plus

## 🔥 Destaques Técnicos
✅ **Atomic Operations**  
- Atualizações atômicas no banco de dados garantindo consistência

✅ **Validação em 3 Camadas**  
1. Zod no frontend
2. TypeScript em tempo de compilação
3. Firebase Rules no backend

✅ **Sistema de Logs Administrativos**  
- Todas as ações críticas são registradas no Firestore

## 🛠️ Como Executar Localmente

### Pré-requisitos
- Node.js 18+
- Conta no Firebase
- CLI do Firebase instalada (`npm install -g firebase-tools`)

### Passo a Passo
```bash
# 1. Clone o repositório
git clone https://github.com/leorecoa/prime-achados-app

# 2. Acesse a pasta do projeto
cd prime-achados-app

# 3. Instale as dependências
npm install

# 4. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o .env.local com suas credenciais do Firebase

# 5. Inicie o servidor de desenvolvimento
npm run dev
