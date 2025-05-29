# Prime Achados App

Uma aplicação web para encontrar e compartilhar as melhores ofertas disponíveis na internet.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Framework CSS utilitário
- **Shadcn/UI**: Componentes de UI reutilizáveis
- **React Router**: Roteamento para aplicações React
- **React Query**: Gerenciamento de estado e cache para dados assíncronos
- **Supabase**: Backend as a Service (BaaS) para banco de dados
- **Lucide React**: Biblioteca de ícones

## Funcionalidades

- Visualização de produtos em destaque
- Filtragem por categorias
- Promoção diária com temporizador
- Acesso direto a links de afiliados
- Responsividade para dispositivos móveis e desktop

## Estrutura do Projeto

```
prime-achados-app/
├── public/              # Arquivos estáticos
├── src/
│   ├── components/      # Componentes React
│   │   ├── ui/          # Componentes de UI reutilizáveis
│   ├── data/            # Dados estáticos e mocks
│   ├── hooks/           # Hooks personalizados
│   ├── integrations/    # Integrações com serviços externos
│   │   └── supabase/    # Cliente e tipos do Supabase
│   ├── lib/             # Funções utilitárias
│   ├── pages/           # Componentes de página
│   ├── App.tsx          # Componente principal
│   └── main.tsx         # Ponto de entrada
├── supabase/            # Configuração do Supabase
└── ...                  # Arquivos de configuração
```

## Configuração do Banco de Dados

O projeto utiliza o Supabase como banco de dados. As tabelas principais são:

- `products`: Armazena informações sobre os produtos
- `daily_deals`: Armazena as promoções diárias
- `categories`: Armazena as categorias disponíveis

## Como Executar

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   ```
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
   ```
4. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

## Melhorias Futuras

- Implementação de busca avançada
- Sistema de notificações para novas ofertas
- Página de detalhes do produto
- Histórico de preços
- Compartilhamento em redes sociais
- Cupons de desconto
- Área administrativa para gerenciamento de produtos

## Licença

Este projeto está licenciado sob a licença MIT.