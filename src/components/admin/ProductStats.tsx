import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/data/products';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ProductStatsProps {
  products: Product[];
}

const ProductStats: React.FC<ProductStatsProps> = ({ products }) => {
  // Calcular estatísticas
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + product.discountPrice, 0);
  const averageDiscount = products.length > 0 
    ? products.reduce((sum, product) => {
        const discount = ((product.originalPrice - product.discountPrice) / product.originalPrice) * 100;
        return sum + discount;
      }, 0) / products.length
    : 0;
  
  // Dados para o gráfico de categorias
  const categoryData = products.reduce((acc: Record<string, number>, product) => {
    const category = product.category || 'Sem categoria';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  
  const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value
  }));
  
  // Dados para o gráfico de descontos
  const discountRanges = [
    { name: '0-10%', range: [0, 10], count: 0 },
    { name: '10-20%', range: [10, 20], count: 0 },
    { name: '20-30%', range: [20, 30], count: 0 },
    { name: '30-40%', range: [30, 40], count: 0 },
    { name: '40-50%', range: [40, 50], count: 0 },
    { name: '50%+', range: [50, 100], count: 0 },
  ];
  
  products.forEach(product => {
    const discount = ((product.originalPrice - product.discountPrice) / product.originalPrice) * 100;
    const range = discountRanges.find(r => discount >= r.range[0] && discount < r.range[1]) || discountRanges[discountRanges.length - 1];
    range.count++;
  });
  
  const discountChartData = discountRanges.map(range => ({
    name: range.name,
    value: range.count
  }));
  
  // Cores para o gráfico de pizza
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF6B6B'];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Valor Total (R$)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Desconto Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageDiscount.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Produtos por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {categoryChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} produtos`, 'Quantidade']} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Sem dados para exibir
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Descontos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {discountChartData.some(item => item.value > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={discountChartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} produtos`, 'Quantidade']} />
                    <Bar dataKey="value" fill="#FF8042" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Sem dados para exibir
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductStats;