import React, { useState } from 'react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, RefreshCw, AlertCircle } from 'lucide-react';
import { useLocalProducts } from '@/hooks/useLocalProducts';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const ProductManager: React.FC = () => {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  } = useLocalProducts();

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    addProduct(productData);
    setIsAddingProduct(false);
  };

  const handleUpdateProduct = (productData: Product) => {
    updateProduct(productData);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsAddingProduct(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct(id);
    }
  };

  const handleCancel = () => {
    setIsAddingProduct(false);
    setEditingProduct(null);
  };



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
        <div className="flex gap-2">
          {!isAddingProduct && !editingProduct && (
            <Button onClick={() => setIsAddingProduct(true)}>
              <Plus className="w-4 h-4 mr-2" />
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
            <ProductForm
              onSubmit={handleAddProduct}
              onCancel={handleCancel}
            />
          </CardContent>
        </Card>
      )}

      {editingProduct && (
        <Card>
          <CardHeader>
            <CardTitle>Editar Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm
              product={editingProduct}
              onSubmit={handleUpdateProduct}
              onCancel={handleCancel}
            />
          </CardContent>
        </Card>
      )}

      {!isAddingProduct && !editingProduct && (
        <>
          {products.length > 0 ? (
            <ProductList
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Nenhum produto encontrado. Clique em "Adicionar Produto" para começar.
              </AlertDescription>
            </Alert>
          )}
        </>
      )}
    </div>
  );
};

export default ProductManager;