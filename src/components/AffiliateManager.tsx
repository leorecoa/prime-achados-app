import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { AffiliatePlatform, createPlatformAffiliateLink } from '@/utils/affiliate-links';

interface AffiliateManagerProps {
  onLinkGenerated?: (link: string) => void;
}

export default function AffiliateManager({ onLinkGenerated }: AffiliateManagerProps) {
  const [platform, setPlatform] = useState<AffiliatePlatform>(AffiliatePlatform.AMAZON);
  const [productId, setProductId] = useState('');
  const [affiliateId, setAffiliateId] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleGenerateLink = () => {
    if (!productId || !affiliateId) return;
    
    const link = createPlatformAffiliateLink(platform, productId, affiliateId);
    setGeneratedLink(link);
    
    if (onLinkGenerated) {
      onLinkGenerated(link);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Gerenciador de Links de Afiliados</CardTitle>
        <CardDescription>
          Crie links de afiliados para diferentes plataformas
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="platform">Plataforma</Label>
          <Select 
            value={platform} 
            onValueChange={(value) => setPlatform(value as AffiliatePlatform)}
          >
            <SelectTrigger id="platform">
              <SelectValue placeholder="Selecione uma plataforma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={AffiliatePlatform.AMAZON}>Amazon</SelectItem>
              <SelectItem value={AffiliatePlatform.ALIEXPRESS}>AliExpress</SelectItem>
              <SelectItem value={AffiliatePlatform.MAGALU}>Magazine Luiza</SelectItem>
              <SelectItem value={AffiliatePlatform.AMERICANAS}>Americanas</SelectItem>
              <SelectItem value={AffiliatePlatform.CUSTOM}>Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="productId">ID do Produto</Label>
          <Input 
            id="productId" 
            placeholder="Ex: B07PXGQC1Q" 
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="affiliateId">Seu ID de Afiliado</Label>
          <Input 
            id="affiliateId" 
            placeholder="Ex: seunome-20" 
            value={affiliateId}
            onChange={(e) => setAffiliateId(e.target.value)}
          />
        </div>
        
        {generatedLink && (
          <div className="space-y-2 pt-4">
            <Label htmlFor="generatedLink">Link Gerado</Label>
            <div className="flex gap-2">
              <Input 
                id="generatedLink" 
                value={generatedLink} 
                readOnly 
                className="flex-1"
              />
              <Button onClick={handleCopyLink} variant="outline">
                Copiar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button onClick={handleGenerateLink} className="w-full">
          Gerar Link de Afiliado
        </Button>
      </CardFooter>
    </Card>
  );
}