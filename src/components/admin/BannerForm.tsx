import React, { useState, useEffect } from 'react';
import { Banner } from '@/contexts/AdminContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image, Link, ExternalLink, AlertCircle } from 'lucide-react';

interface BannerFormProps {
  banner?: Banner;
  onSubmit: (banner: Omit<Banner, 'id'> | Banner) => void;
  onCancel?: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({ banner, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Banner, 'id'> | Banner>({
    title: '',
    description: '',
    imageUrl: '',
    linkUrl: '',
    active: true,
    position: 'top',
    id: ''
  });
  
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isValidImage, setIsValidImage] = useState<boolean>(true);
  const [imageSize, setImageSize] = useState<{width: number, height: number} | null>(null);

  useEffect(() => {
    if (banner) {
      setFormData(banner);
      setImagePreview(banner.imageUrl);
    }
  }, [banner]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'imageUrl') {
      setImagePreview(value);
      setIsValidImage(true);
      setImageSize(null);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      active: checked,
    }));
  };

  const handlePositionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      position: value as 'top' | 'middle' | 'bottom',
    }));
  };

  const handleImageError = () => {
    setIsValidImage(false);
    setImageSize(null);
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsValidImage(true);
    const img = e.target as HTMLImageElement;
    setImageSize({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.trim()) {
      if (e.currentTarget.name === 'imageUrl') {
        setImagePreview(pastedText);
      }
    }
  };

  // Recomendações de proporção com base na posição
  const getRecommendedAspectRatio = () => {
    switch (formData.position) {
      case 'top':
        return '5:1';
      case 'middle':
        return '6:1';
      case 'bottom':
        return '7:1';
      default:
        return '6:1';
    }
  };

  // Verificar se a proporção da imagem é adequada
  const isGoodAspectRatio = () => {
    if (!imageSize) return true;
    
    const ratio = imageSize.width / imageSize.height;
    const minRatio = 4; // Pelo menos 4:1
    const maxRatio = 8; // No máximo 8:1
    
    return ratio >= minRatio && ratio <= maxRatio;
  };

  // Renderizar a pré-visualização com a proporção correta
  const getPreviewAspectRatio = () => {
    switch (formData.position) {
      case 'top':
        return 'aspect-[5/1]';
      case 'middle':
        return 'aspect-[6/1]';
      case 'bottom':
        return 'aspect-[7/1]';
      default:
        return 'aspect-[6/1]';
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Banner</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="flex items-center">
              <Image className="w-4 h-4 mr-2" />
              URL da Imagem
            </Label>
            <div className="relative">
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                onPaste={handlePaste}
                className={!isValidImage && imagePreview ? "border-red-500" : ""}
                required
                placeholder="https://exemplo.com/imagem.jpg"
              />
              {formData.imageUrl && (
                <a 
                  href={formData.imageUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            
            <div className="text-xs text-gray-500 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              Proporção recomendada: {getRecommendedAspectRatio()} (formato paisagem)
            </div>
            
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-2">Pré-visualização:</p>
                <div className={`border rounded-md overflow-hidden ${getPreviewAspectRatio()}`}>
                  <div className="relative w-full h-full">
                    <img
                      src={imagePreview}
                      alt="Pré-visualização"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                    />
                  </div>
                </div>
                {!isValidImage && (
                  <p className="text-sm text-red-500 mt-1">
                    URL de imagem inválida. Verifique o endereço.
                  </p>
                )}
                {isValidImage && imageSize && !isGoodAspectRatio() && (
                  <p className="text-sm text-amber-500 mt-1">
                    Atenção: A proporção da imagem ({(imageSize.width / imageSize.height).toFixed(1)}:1) não é ideal. 
                    Recomendamos uma proporção entre 4:1 e 8:1 para melhor visualização.
                  </p>
                )}
                {isValidImage && imageSize && (
                  <p className="text-xs text-gray-500 mt-1">
                    Dimensões: {imageSize.width}x{imageSize.height} pixels (proporção {(imageSize.width / imageSize.height).toFixed(1)}:1)
                  </p>
                )}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="linkUrl" className="flex items-center">
              <Link className="w-4 h-4 mr-2" />
              URL de Destino
            </Label>
            <div className="relative">
              <Input
                id="linkUrl"
                name="linkUrl"
                value={formData.linkUrl}
                onChange={handleChange}
                onPaste={handlePaste}
                required
                placeholder="https://exemplo.com ou #secao"
              />
              {formData.linkUrl && (
                <a 
                  href={formData.linkUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Use URLs completas (https://...) para links externos ou âncoras (#secao) para links internos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">Posição</Label>
              <Select 
                value={formData.position} 
                onValueChange={handlePositionChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a posição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Topo (proporção 5:1)</SelectItem>
                  <SelectItem value="middle">Meio (proporção 6:1)</SelectItem>
                  <SelectItem value="bottom">Rodapé (proporção 7:1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="active" className="block mb-2">Status</Label>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="active" 
                  checked={formData.active} 
                  onCheckedChange={handleSwitchChange} 
                />
                <Label htmlFor="active" className="cursor-pointer">
                  {formData.active ? 'Ativo' : 'Inativo'}
                </Label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            <Button 
              type="submit"
              disabled={!isValidImage && imagePreview ? true : false}
            >
              {banner ? 'Atualizar' : 'Adicionar'} Banner
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BannerForm;