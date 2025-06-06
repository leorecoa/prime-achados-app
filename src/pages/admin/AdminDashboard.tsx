import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Edit, Trash2, Plus, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AdminDashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, syncWithServer } = useAdmin();
  const { toast } = useToast();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    image: '',
    originalPrice: 0,
    discountPrice: 0,
    category: '',
    affiliateLink: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'originalPrice' || name === 'discountPrice') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(formData);
    setFormData({
      name: '',
      image: '',
      originalPrice: 0,
      discountPrice: 0,
      category: '',
      affiliateLink: '',
      description: ''
    });
    setIsAddingProduct(false);
    
    // Forçar sincronização após adicionar produto
    await syncWithServer();
    
    toast({
      title: 'Produto adicionado',
      description: 'O produto foi adicionado com sucesso.',
    });
    
    // Forçar atualização do localStorage
    localStorage.setItem('admin_products', JSON.stringify([...products, {...formData, id: Date.now().toString()}]));
    
    // Disparar evento de storage manualmente
    window.dispatchEvent(new Event('storage'));
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      const updatedProduct = {
        ...formData,
        id: editingProduct.id
      };
      updateProduct(updatedProduct);
      setEditingProduct(null);
      
      // Forçar sincronização após atualizar produto
      await syncWithServer();
      
      toast({
        title: 'Produto atualizado',
        description: 'O produto foi atualizado com sucesso.',
      });
      
      // Forçar atualização do localStorage
      const updatedProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
      localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
      
      // Disparar evento de storage manualmente
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct(id);
      
      // Forçar sincronização após excluir produto
      await syncWithServer();
      
      toast({
        title: 'Produto excluído',
        description: 'O produto foi excluído com sucesso.',
      });
      
      // Forçar atualização do localStorage
      const updatedProducts = products.filter(p => p.id !== id);
      localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
      
      // Disparar evento de storage manualmente
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      image: product.image,
      originalPrice: product.originalPrice,
      discountPrice: product.discountPrice,
      category: product.category || '',
      affiliateLink: product.affiliateLink,
      description: product.description || ''
    });
  };

  const handleSyncProducts = async () => {
    const success = await syncWithServer();
    
    if (success) {
      toast({
        title: 'Sincronização concluída',
        description: 'Todos os produtos foram sincronizados com sucesso.',
      });
      
      // Forçar atualização do localStorage
      localStorage.setItem('admin_products', JSON.stringify(products));
      
      // Disparar evento de storage manualmente
      window.dispatchEvent(new Event('storage'));
    } else {
      toast({
        title: 'Erro na sincronização',
        description: 'Ocorreu um erro ao sincronizar os produtos.',
        variant: 'destructive',
      });
    }
  };

  const renderForm = () => (
    <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Produto</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">URL da Imagem</Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          required
        />
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="affiliateLink">Link de Afiliado</Label>
        <Input
          id="affiliateLink"
          name="affiliateLink"
          value={formData.affiliateLink}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsAddingProduct(false);
            setEditingProduct(null);
          }}
        >
          Cancelar
        </Button>
        <Button type="submit">
          {editingProduct ? 'Atualizar Produto' : 'Adicionar Produto'}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
        <div className="flex space-x-2">
          <Button onClick={handleSyncProducts} variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Sincronizar
          </Button>
          {!isAddingProduct && !editingProduct && (
            <Button onClick={() => setIsAddingProduct(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Produto
            </Button>
          )}
        </div>
      </div>

      {isAddingProduct && (
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Novo Produto</CardTitle>
          </CardHeader>
          <CardContent>
            {renderForm()}
          </CardContent>
        </Card>
      )}

      {editingProduct && (
        <Card>
          <CardHeader>
            <CardTitle>Editar Produto</CardTitle>
          </CardHeader>
          <CardContent>
            {renderForm()}
          </CardContent>
        </Card>
      )}

      {!isAddingProduct && !editingProduct && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <Card key={product.id}>
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Imagem+Indisponível';
                    }}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex justify-between mb-2">
                    <div className="text-sm text-gray-500">Preço Original:</div>
                    <div className="font-medium">R$ {product.originalPrice.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="text-sm text-gray-500">Preço com Desconto:</div>
                    <div className="font-medium text-green-600">R$ {product.discountPrice.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Nenhum produto encontrado</AlertTitle>
                <AlertDescription>
                  Clique em "Adicionar Produto" para criar seu primeiro produto.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;