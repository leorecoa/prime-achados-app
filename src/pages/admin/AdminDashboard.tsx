import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SimpleProductManager from '@/components/admin/SimpleProductManager';
import ProductStats from '@/components/admin/ProductStats';
import { useLocalProducts } from '@/hooks/useLocalProducts';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('products');
  const { products } = useLocalProducts();



  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Painel Administrativo</h1>
      
      <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <SimpleProductManager />
        </TabsContent>
        
        <TabsContent value="stats">
          <ProductStats products={products} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;