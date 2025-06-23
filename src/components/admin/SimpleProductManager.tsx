import React, { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { storage } from '@/lib/storage';

const SimpleProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    originalPrice: '',
    discountPrice: '',
    affiliateLink: '',
    description: '',
    category: ''
  });

  useEffect(() => {
    setProducts(storage.getProducts());
  }, []);

  const saveProduct = () => {
    const newProduct = storage.addProduct({
      name: formData.name,
      image: formData.image,
      originalPrice: parseFloat(formData.originalPrice),
      discountPrice: parseFloat(formData.discountPrice),
      affiliateLink: formData.affiliateLink,
      description: formData.description,
      category: formData.category
    });

    setProducts(storage.getProducts());
    
    setFormData({
      name: '',
      image: '',
      originalPrice: '',
      discountPrice: '',
      affiliateLink: '',
      description: '',
      category: ''
    });
    setShowForm(false);
    alert('Produto salvo!');
  };

  const deleteProduct = (id: string) => {
    storage.deleteProduct(id);
    setProducts(storage.getProducts());
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Produtos ({products.length})</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Adicionar Produto'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Novo Produto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Nome do produto"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <Input
              placeholder="URL da imagem"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Preço original"
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
              />
              <Input
                placeholder="Preço com desconto"
                type="number"
                value={formData.discountPrice}
                onChange={(e) => setFormData({...formData, discountPrice: e.target.value})}
              />
            </div>
            <Input
              placeholder="Link de afiliado"
              value={formData.affiliateLink}
              onChange={(e) => setFormData({...formData, affiliateLink: e.target.value})}
            />
            <Input
              placeholder="Categoria"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            />
            <Textarea
              placeholder="Descrição"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            <Button onClick={saveProduct} className="w-full">
              Salvar Produto
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-sm">R$ {product.originalPrice} → R$ {product.discountPrice}</p>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => deleteProduct(product.id)}
                >
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SimpleProductManager;