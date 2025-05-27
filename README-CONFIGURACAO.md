
# 📝 Como Editar Links e Produtos - Achadinhos Prime

## 🎯 Arquivos de Configuração

### 1. **Produtos Principais** - `src/data/products.ts`
Arquivo onde você pode editar todos os produtos da loja:

```typescript
{
  id: '1',
  name: 'Nome do Produto',
  image: 'URL da imagem',
  originalPrice: 999.99,
  discountPrice: 599.99,
  discount: 40,
  rating: 4.8,
  category: 'electronics', // electronics, home, beauty, kids, coupons
  affiliateLink: 'SEU_LINK_DE_AFILIADO_AQUI'
}
```

### 2. **Achado do Dia** - `src/data/dailyDeal.ts`
Arquivo para configurar o produto em destaque:

```typescript
export const dailyDeal = {
  name: 'Nome do Produto do Dia',
  image: 'URL da imagem',
  originalPrice: 1299.99,
  discountPrice: 899.99,
  discount: 31,
  affiliateLink: 'SEU_LINK_DE_AFILIADO_AQUI',
  description: 'Descrição do produto'
};
```

## ✏️ Como Editar

### Para adicionar um novo produto:
1. Abra `src/data/products.ts`
2. Adicione um novo objeto na lista `products`
3. Configure todos os campos necessários
4. Salve o arquivo

### Para trocar o "Achado do Dia":
1. Abra `src/data/dailyDeal.ts`
2. Altere as informações do produto
3. Troque o link de afiliado
4. Salve o arquivo

### Para alterar o timer do "Achado do Dia":
1. No arquivo `src/data/dailyDeal.ts`
2. Modifique o `timerConfig`:
```typescript
export const timerConfig = {
  hours: 23,    // Horas
  minutes: 45,  // Minutos
  seconds: 30   // Segundos
};
```

## 📱 Categorias Disponíveis:
- `electronics` - Eletrônicos
- `home` - Casa
- `beauty` - Beleza
- `kids` - Infantil
- `coupons` - Cupons

## 🔗 Links de Afiliado
Substitua `https://amzn.to/45eaCUr` pelos seus links únicos de cada produto.

## 💡 Dicas:
- Use imagens do Unsplash ou suas próprias URLs
- Mantenha os preços atualizados
- Teste os links antes de publicar
- Adicione produtos variados para cada categoria
