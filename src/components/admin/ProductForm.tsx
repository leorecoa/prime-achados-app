import React, { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, 'id'> | Product) => void;
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'> | Product>({
    name: '',
    image: '',
    originalPrice: 0,
    discountPrice: 0,
    affiliateLink: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'originalPrice' || name === 'discountPrice' 
        ? parseFloat(value) || 0 
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">URL da Imagem</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Preço Original</Label>
              <Input
                id="originalPrice"
                name="originalPrice"
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="discountPrice">Preço com Desconto</Label>
              <Input
                id="discountPrice"
                name="discountPrice"
                type="number"
                step="0.01"
                value={formData.discountPrice}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="affiliateLink">Link de Afiliado</Label>
            <Input
              id="affiliateLink"
              name="affiliateLink"
              value={formData.affiliateLink}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            <Button type="submit">
              {product ? 'Atualizar' : 'Adicionar'} Produto
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;