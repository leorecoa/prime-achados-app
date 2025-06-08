import React, { useState, useEffect, useRef } from 'react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Edit, Trash2, Plus, Save, RefreshCw, Download, Upload, BarChart3, CloudSync } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getAllProducts, saveProducts, addProduct as addProductToStorage, updateProduct as updateProductInStorage, deleteProduct as deleteProductFromStorage, clearProducts } from '@/utils/productStorage';
import { useProductsDatabase } from '@/hooks/useProductsDatabase';
import ProductStats from '@/components/admin/ProductStats';

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('products');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Firebase Realtime Database hook
  const { 
    products: firebaseProducts, 
    loading: firebaseLoading, 
    addProduct: addProductToFirebase,
    updateProduct: updateProductInFirebase,
    deleteProduct: deleteProductFromFirebase,
    syncLocalToFirebase,
    isProcessing: isSyncingFirebase
  } = useProductsDatabase();
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    image: '',
    originalPrice: 0,
    discountPrice: 0,
    category: '',
    affiliateLink: '',
    description: ''
  });

  // Carregar produtos do storage e Firebase ao iniciar
  useEffect(() => {
    loadProducts();
  }, []);

  // Usar produtos do Firebase quando disponíveis
  useEffect(() => {
    if (firebaseProducts && firebaseProducts.length > 0) {
      // Manter os produtos do localStorage se não houver produtos no Firebase
      if (products.length === 0) {
        setProducts(firebaseProducts);
      }
    }
  }, [firebaseProducts]);

  const loadProducts = () => {
    const storedProducts = getAllProducts();
    setProducts(storedProducts);
  };

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
    
    // Adicionar diretamente ao storage
    const newProduct = addProductToStorage(formData);
    
    // Atualizar estado local
    setProducts(prev => [...prev, newProduct]);
    
    // Adicionar ao Firebase
    await addProductToFirebase({
      ...formData,
      id: newProduct.id // Manter o mesmo ID para consistência
    });
    
    // Resetar formulário
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
    
    toast({
      title: 'Produto adicionado',
      description: 'O produto foi adicionado com sucesso ao sistema e ao Firebase.',
    });
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      const updatedProduct = {
        ...formData,
        id: editingProduct.id
      };
      
      // Atualizar diretamente no storage
      updateProductInStorage(updatedProduct);
      
      // Atualizar no Firebase
      await updateProductInFirebase(updatedProduct);
      
      // Atualizar estado local
      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      
      setEditingProduct(null);
      
      toast({
        title: 'Produto atualizado',
        description: 'O produto foi atualizado com sucesso no sistema e no Firebase.',
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      // Excluir diretamente do storage
      deleteProductFromStorage(id);
      
      // Excluir do Firebase
      await deleteProductFromFirebase(id);
      
      // Atualizar estado local
      setProducts(prev => prev.filter(p => p.id !== id));
      
      toast({
        title: 'Produto excluído',
        description: 'O produto foi excluído com sucesso do sistema e do Firebase.',
      });
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
    // Salvar produtos atuais diretamente no storage
    saveProducts(products);
    
    // Sincronizar com o Firebase
    await syncLocalToFirebase(products);
    
    toast({
      title: 'Sincronização concluída',
      description: 'Todos os produtos foram sincronizados com o localStorage e Firebase.',
    });
  };

  const handleClearProducts = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os produtos? Esta ação não pode ser desfeita.')) {
      clearProducts();
      setProducts([]);
      
      toast({
        title: 'Produtos limpos',
        description: 'Todos os produtos foram removidos com sucesso.',
      });
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    loadProducts();
    setIsLoading(false);
    
    toast({
      title: 'Produtos atualizados',
      description: 'A lista de produtos foi atualizada.',
    });
  };

  // Exportar produtos para um arquivo JSON
  const handleExportProducts = () => {
    try {
      const dataStr = JSON.stringify(products, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `prime-achados-produtos-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: 'Exportação concluída',
        description: 'Os produtos foram exportados com sucesso.',
      });
    } catch (error) {
      console.error('Erro ao exportar produtos:', error);
      toast({
        title: 'Erro na exportação',
        description: 'Ocorreu um erro ao exportar os produtos.',
        variant: 'destructive',
      });
    }
  };

  // Importar produtos de um arquivo JSON
  const handleImportProducts = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedProducts = JSON.parse(event.target?.result as string);
        
        if (Array.isArray(importedProducts)) {
          saveProducts(importedProducts);
          setProducts(importedProducts);
          
          toast({
            title: 'Importação concluída',
            description: `${importedProducts.length} produtos foram importados com sucesso.`,
          });
        } else {
          throw new Error('Formato inválido');
        }
      } catch (error) {
        console.error('Erro ao importar produtos:', error);
        toast({
          title: 'Erro na importação',
          description: 'O arquivo selecionado não é um JSON válido de produtos.',
          variant: 'destructive',
        });
      }
    };
    
    reader.readAsText(file);
    
    // Limpar o input para permitir selecionar o mesmo arquivo novamente
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleRefresh} variant="outline" disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          
          <Button onClick={handleExportProducts} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          
          <Button onClick={handleImportProducts} variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          
          <Button onClick={handleSyncProducts} variant="outline" disabled={isSyncingFirebase}>
            <CloudSync className={`mr-2 h-4 w-4 ${isSyncingFirebase ? 'animate-spin' : ''}`} />
            Sincronizar Firebase
          </Button>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".json" 
            style={{ display: 'none' }} 
          />
          
          <Button onClick={handleClearProducts} variant="destructive">
            Limpar
          </Button>
          
          {!isAddingProduct && !editingProduct && activeTab === 'products' && (
            <Button onClick={() => setIsAddingProduct(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
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
            <>
              {firebaseLoading && (
                <div className="w-full p-4 text-center">
                  <p className="text-gray-500">Carregando produtos do Firebase...</p>
                </div>
              )}
              
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
                        Clique em "Adicionar Produto" para criar seu primeiro produto ou "Importar" para carregar produtos de um arquivo.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="stats">
          <ProductStats products={products} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;