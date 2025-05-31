import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import ProductList from '@/components/admin/ProductList';
import ProductForm from '@/components/admin/ProductForm';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AdminDashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, syncWithServer, isSyncing } = useAdmin();
  const { toast } = useToast();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    addProduct(product);
    setIsAddingProduct(false);
    toast({
      title: 'Produto adicionado',
      description: 'O produto foi adicionado com sucesso.',
    });
  };

  const handleUpdateProduct = (product: Product) => {
    updateProduct(product);
    setEditingProduct(null);
    toast({
      title: 'Produto atualizado',
      description: 'O produto foi atualizado com sucesso.',
    });
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    toast({
      title: 'Produto excluído',
      description: 'O produto foi excluído com sucesso.',
    });
  };

  const handleSync = async () => {
    setSyncError(null);
    const success = await syncWithServer();
    
    if (success) {
      toast({
        title: 'Sincronização concluída',
        description: 'Os produtos foram sincronizados com sucesso.',
      });
    } else {
      setSyncError('Erro ao sincronizar produtos. Tente novamente.');
      toast({
        title: 'Erro de sincronização',
        description: 'Não foi possível sincronizar os produtos.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
        <div className="flex space-x-2">
          <Button 
            onClick={handleSync} 
            disabled={isSyncing}
            variant="outline"
          >
            {isSyncing ? 'Sincronizando...' : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Sincronizar
              </>
            )}
          </Button>
          {!isAddingProduct && !editingProduct && (
            <Button onClick={() => setIsAddingProduct(true)}>
              Adicionar Produto
            </Button>
          )}
        </div>
      </div>

      {syncError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{syncError}</AlertDescription>
        </Alert>
      )}

      {isAddingProduct && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Adicionar Novo Produto</h3>
          <ProductForm 
            onSubmit={handleAddProduct} 
            onCancel={() => setIsAddingProduct(false)} 
          />
        </div>
      )}

      {editingProduct && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Editar Produto</h3>
          <ProductForm 
            product={editingProduct} 
            onSubmit={handleUpdateProduct} 
            onCancel={() => setEditingProduct(null)} 
          />
        </div>
      )}

      {!isAddingProduct && !editingProduct && (
        <ProductList 
          products={products} 
          onEdit={setEditingProduct} 
          onDelete={handleDeleteProduct} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;