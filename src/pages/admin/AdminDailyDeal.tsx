import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import ProductForm from '@/components/admin/ProductForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { AlertCircle, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AdminDailyDeal: React.FC = () => {
  const { dailyDeal, updateDailyDeal, syncWithServer, isSyncing } = useAdmin();
  const { toast } = useToast();
  const [syncError, setSyncError] = useState<string | null>(null);

  const handleUpdateDailyDeal = (product: Product) => {
    updateDailyDeal(product);
    toast({
      title: 'Achado do Dia atualizado',
      description: 'O Achado do Dia foi atualizado com sucesso.',
    });
  };

  const handleSync = async () => {
    setSyncError(null);
    const success = await syncWithServer();
    
    if (success) {
      toast({
        title: 'Sincronização concluída',
        description: 'O Achado do Dia foi sincronizado com sucesso.',
      });
    } else {
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
          {dailyDeal ? (
            <ProductForm 
              product={dailyDeal} 
              onSubmit={handleUpdateDailyDeal} 
            />
          ) : (
            <p>Carregando...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDailyDeal;