import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import ProductForm from '@/components/admin/ProductForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { AlertCircle, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useDatabase } from '@/hooks/useDatabase';

const AdminDailyDeal: React.FC = () => {
  const { dailyDeal: localDailyDeal, updateDailyDeal, syncWithServer, isSyncing } = useAdmin();
  const { data: firebaseDailyDeal, updateData, loading } = useDatabase<{
    productId: string;
    discount: number;
    active: boolean;
  }>('dailyDeal');
  const { toast } = useToast();
  const [syncError, setSyncError] = useState<string | null>(null);

  const handleUpdateDailyDeal = (product: Product) => {
    // Atualiza no contexto local
    updateDailyDeal(product);
    
    // Atualiza no Firebase
    updateData({
      productId: product.id,
      discount: product.discountPercentage || 0,
      active: true
    });
    
    toast({
      title: 'Achado do Dia atualizado',
      description: 'O Achado do Dia foi atualizado com sucesso.',
    });
  };

  const handleSync = async () => {
    setSyncError(null);
    try {
      // Sincroniza com o servidor local
      const success = await syncWithServer();
      
      // Sincroniza com o Firebase
      if (localDailyDeal) {
        await updateData({
          productId: localDailyDeal.id,
          discount: localDailyDeal.discountPercentage || 0,
          active: true
        });
      }
      
      if (success) {
        toast({
          title: 'Sincronização concluída',
          description: 'O Achado do Dia foi sincronizado com sucesso.',
        });
      } else {
        throw new Error('Falha na sincronização');
      }
    } catch (error) {
      setSyncError('Erro ao sincronizar o Achado do Dia. Tente novamente.');
      toast({
        title: 'Erro de sincronização',
        description: 'Não foi possível sincronizar o Achado do Dia.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Achado do Dia</h2>
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
      </div>
      
      {syncError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{syncError}</AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Configurar Achado do Dia</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Carregando dados do Firebase...</p>
          ) : localDailyDeal ? (
            <>
              <ProductForm 
                product={localDailyDeal} 
                onSubmit={handleUpdateDailyDeal} 
              />
              
              {firebaseDailyDeal && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium mb-2">Dados no Firebase:</h3>
                  <p>ID do Produto: {firebaseDailyDeal.productId}</p>
                  <p>Desconto: {firebaseDailyDeal.discount}%</p>
                  <p>Status: {firebaseDailyDeal.active ? 'Ativo' : 'Inativo'}</p>
                </div>
              )}
            </>
          ) : (
            <p>Carregando...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDailyDeal;