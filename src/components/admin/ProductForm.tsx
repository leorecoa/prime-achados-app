import React, { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Image, Link, ExternalLink } from 'lucide-react';

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
  
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isValidImage, setIsValidImage] = useState<boolean>(true);

  useEffect(() => {
    if (product) {
      setFormData(product);
      setImagePreview(product.image);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'image') {
      setImagePreview(value);
      // Reset validation state when URL changes
      setIsValidImage(true);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'originalPrice' || name === 'discountPrice' 
        ? parseFloat(value) || 0 
        : value,
    }));
  };

  const handleImageError = () => {
    setIsValidImage(false);
  };

  const handleImageLoad = () => {
    setIsValidImage(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.trim()) {
      if (e.currentTarget.name === 'image') {
        setImagePreview(pastedText);
      }
    }
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
            <Label htmlFor="image" className="flex items-center">
              <Image className="w-4 h-4 mr-2" />
              URL da Imagem
            </Label>
            <div className="relative">
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                onPaste={handlePaste}
                className={!isValidImage && imagePreview ? "border-red-500" : ""}
                required
              />
              {imagePreview && (
                <a 
                  href={imagePreview} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-2">Pré-visualização:</p>
                <div className="border rounded-md p-2 bg-gray-50 flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Pré-visualização"
                    className="max-h-40 object-contain"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </div>
                {!isValidImage && (
                  <p className="text-sm text-red-500 mt-1">
                    URL de imagem inválida. Verifique o endereço.
                  </p>
                )}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label htmlFor="affiliateLink" className="flex items-center">
              <Link className="w-4 h-4 mr-2" />
              Link de Afiliado
            </Label>
            <div className="relative">
              <Input
                id="affiliateLink"
                name="affiliateLink"
                value={formData.affiliateLink}
                onChange={handleChange}
                onPaste={handlePaste}
                required
              />
              {formData.affiliateLink && (
                <a 
                  href={formData.affiliateLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
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
            <Button 
              type="submit"
              disabled={!isValidImage && imagePreview ? true : false}
            >
              {product ? 'Atualizar' : 'Adicionar'} Produto
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;