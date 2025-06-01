import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import ProductList from '@/components/admin/ProductList';
import ProductForm from '@/components/admin/ProductForm';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, Save, Download, Upload } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AdminDashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, syncWithServer, isSyncing, exportData, importData } = useAdmin();
  const { toast } = useToast();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [fileInputRef] = useState(React.createRef<HTMLInputElement>());

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
    try {
      const success = await syncWithServer();
      
      if (success) {
        toast({
          title: 'Sincronização concluída',
          description: 'Os produtos foram sincronizados com sucesso.',
        });
      } else {
        throw new Error('Falha na sincronização');
      }
    } catch (error) {
      setSyncError('Erro ao sincronizar produtos. Tente novamente.');
      toast({
        title: 'Erro de sincronização',
        description: 'Não foi possível sincronizar os produtos.',
        variant: 'destructive',
      });
    }
  };

  const handleExport = () => {
    exportData();
    toast({
      title: 'Exportação concluída',
      description: 'Os dados foram exportados com sucesso.',
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      try {
        const success = importData(content);
        if (success) {
          toast({
            title: 'Importação concluída',
            description: 'Os dados foram importados com sucesso.',
          });
        } else {
          throw new Error('Falha na importação');
        }
      } catch (error) {
        toast({
          title: 'Erro de importação',
          description: 'Não foi possível importar os dados. Verifique o formato do arquivo.',
          variant: 'destructive',
        });
      }
      
      // Limpar o input para permitir selecionar o mesmo arquivo novamente
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={handleSync} 
            disabled={isSyncing}
            variant="outline"
            size="sm"
          >
            {isSyncing ? 'Sincronizando...' : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Sincronizar
              </>
            )}
          </Button>
          
          <Button 
            onClick={handleExport}
            variant="outline"
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          
          <Button 
            onClick={handleImportClick}
            variant="outline"
            size="sm"
          >
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImportFile} 
            accept=".json" 
            className="hidden" 
          />
          
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