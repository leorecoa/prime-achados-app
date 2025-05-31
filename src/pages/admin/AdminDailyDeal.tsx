import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import ProductForm from '@/components/admin/ProductForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/data/products';

const AdminDailyDeal: React.FC = () => {
  const { dailyDeal, updateDailyDeal } = useAdmin();
  const { toast } = useToast();

  const handleUpdateDailyDeal = (product: Product) => {
    updateDailyDeal(product);
    toast({
      title: 'Achado do Dia atualizado',
      description: 'O Achado do Dia foi atualizado com sucesso.',
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gerenciar Achado do Dia</h2>
      
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