import React, { useState } from 'react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleProductExpand = (id: string) => {
    setExpandedProduct(expandedProduct === id ? null : id);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>Lista de Produtos</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-auto">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Nome</TableHead>
                <TableHead className="hidden md:table-cell">Preço Original</TableHead>
                <TableHead className="hidden md:table-cell">Preço com Desconto</TableHead>
                <TableHead className="hidden md:table-cell">Categoria</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <React.Fragment key={product.id}>
                    <TableRow 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleProductExpand(product.id)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="w-8 h-8 mr-2 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                            {product.image ? (
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://placehold.co/32x32?text=Erro';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <ImageIcon className="w-4 h-4 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <span className="line-clamp-1">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">R$ {product.originalPrice.toFixed(2)}</TableCell>
                      <TableCell className="hidden md:table-cell">R$ {product.discountPrice.toFixed(2)}</TableCell>
                      <TableCell className="hidden md:table-cell">{product.category || '-'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            onEdit(product);
                          }}>
                            Editar
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm('Tem certeza que deseja excluir este produto?')) {
                                onDelete(product.id);
                              }
                            }}
                          >
                            Excluir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    {expandedProduct === product.id && (
                      <TableRow>
                        <TableCell colSpan={5} className="bg-gray-50 p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Detalhes do Produto</h4>
                              <div className="space-y-2 text-sm">
                                <div className="md:hidden">
                                  <span className="font-medium">Preço Original:</span> R$ {product.originalPrice.toFixed(2)}
                                </div>
                                <div className="md:hidden">
                                  <span className="font-medium">Preço com Desconto:</span> R$ {product.discountPrice.toFixed(2)}
                                </div>
                                <div className="md:hidden">
                                  <span className="font-medium">Categoria:</span> {product.category || '-'}
                                </div>
                                <div>
                                  <span className="font-medium">Descrição:</span> {product.description}
                                </div>
                                <div className="flex items-center">
                                  <span className="font-medium mr-2">Link de Afiliado:</span>
                                  <a 
                                    href={product.affiliateLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline flex items-center"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    Abrir <ExternalLink className="w-3 h-3 ml-1" />
                                  </a>
                                </div>
                                <div className="flex items-center">
                                  <span className="font-medium mr-2">URL da Imagem:</span>
                                  <a 
                                    href={product.image} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline flex items-center"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    Abrir <ExternalLink className="w-3 h-3 ml-1" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-center items-center">
                              {product.image ? (
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="max-h-40 object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/200x150?text=Imagem+Indisponível';
                                  }}
                                />
                              ) : (
                                <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded">
                                  <ImageIcon className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Nenhum produto encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductList;