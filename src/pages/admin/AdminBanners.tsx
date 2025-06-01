import React, { useState } from 'react';
import { useAdmin, Banner } from '@/contexts/AdminContext';
import BannerForm from '@/components/admin/BannerForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Edit, Trash2, Plus, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const AdminBanners: React.FC = () => {
  const { banners, addBanner, updateBanner, deleteBanner } = useAdmin();
  const { toast } = useToast();
  const [isAddingBanner, setIsAddingBanner] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const handleAddBanner = (banner: Omit<Banner, 'id'>) => {
    addBanner(banner);
    setIsAddingBanner(false);
    toast({
      title: 'Banner adicionado',
      description: 'O banner foi adicionado com sucesso.',
    });
  };

  const handleUpdateBanner = (banner: Banner) => {
    updateBanner(banner);
    setEditingBanner(null);
    toast({
      title: 'Banner atualizado',
      description: 'O banner foi atualizado com sucesso.',
    });
  };

  const handleDeleteBanner = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este banner?')) {
      deleteBanner(id);
      toast({
        title: 'Banner excluído',
        description: 'O banner foi excluído com sucesso.',
      });
    }
  };

  const handleToggleActive = (banner: Banner) => {
    updateBanner({
      ...banner,
      active: !banner.active
    });
    toast({
      title: banner.active ? 'Banner desativado' : 'Banner ativado',
      description: `O banner foi ${banner.active ? 'desativado' : 'ativado'} com sucesso.`,
    });
  };

  const getPositionLabel = (position: string) => {
    switch (position) {
      case 'top': return 'Topo';
      case 'middle': return 'Meio';
      case 'bottom': return 'Rodapé';
      default: return position;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Banners</h2>
        {!isAddingBanner && !editingBanner && (
          <Button onClick={() => setIsAddingBanner(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Banner
          </Button>
        )}
      </div>

      {isAddingBanner && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Adicionar Novo Banner</h3>
          <BannerForm 
            onSubmit={handleAddBanner} 
            onCancel={() => setIsAddingBanner(false)} 
          />
        </div>
      )}

      {editingBanner && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Editar Banner</h3>
          <BannerForm 
            banner={editingBanner} 
            onSubmit={handleUpdateBanner} 
            onCancel={() => setEditingBanner(null)} 
          />
        </div>
      )}

      {!isAddingBanner && !editingBanner && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.length > 0 ? (
            banners.map((banner) => (
              <Card key={banner.id} className={`overflow-hidden ${!banner.active ? 'opacity-70' : ''}`}>
                <div className="relative h-40">
                  <img 
                    src={banner.imageUrl} 
                    alt={banner.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x200?text=Imagem+Indisponível';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg line-clamp-1">{banner.title}</h3>
                    {banner.description && (
                      <p className="text-sm text-white/90 line-clamp-1">{banner.description}</p>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Badge variant={banner.active ? "default" : "outline"} className="text-xs">
                      {getPositionLabel(banner.position)}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="truncate flex-1">
                      {banner.linkUrl}
                    </span>
                    {banner.linkUrl && (
                      <a 
                        href={banner.linkUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-500 hover:text-blue-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleToggleActive(banner)}
                      >
                        {banner.active ? (
                          <>
                            <EyeOff className="w-4 h-4 mr-1" />
                            Desativar
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-1" />
                            Ativar
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingBanner(banner)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteBanner(banner.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Nenhum banner encontrado</AlertTitle>
                <AlertDescription>
                  Clique em "Adicionar Banner" para criar seu primeiro banner promocional.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBanners;