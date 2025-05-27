import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AffiliateManager from '@/components/AffiliateManager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createAffiliateLink } from '@/utils/affiliate-links';

export default function AffiliateLinks() {
  const [customUrl, setCustomUrl] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [source, setSource] = useState('');
  const [customGeneratedLink, setCustomGeneratedLink] = useState('');

  const handleGenerateCustomLink = () => {
    if (!customUrl) return;
    
    const link = createAffiliateLink(customUrl, trackingId, source);
    setCustomGeneratedLink(link);
  };

  const handleCopyCustomLink = () => {
    navigator.clipboard.writeText(customGeneratedLink);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Gerenciador de Links de Afiliados</h1>
      
      <Tabs defaultValue="platforms">
        <TabsList className="mb-6">
          <TabsTrigger value="platforms">Plataformas</TabsTrigger>
          <TabsTrigger value="custom">Link Personalizado</TabsTrigger>
          <TabsTrigger value="guide">Guia de Uso</TabsTrigger>
        </TabsList>
        
        <TabsContent value="platforms">
          <AffiliateManager />
        </TabsContent>
        
        <TabsContent value="custom">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Link Personalizado</CardTitle>
              <CardDescription>
                Adicione parâmetros de rastreamento a qualquer URL
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customUrl">URL do Produto</Label>
                <Input 
                  id="customUrl" 
                  placeholder="https://exemplo.com/produto" 
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="trackingId">ID de Rastreamento (opcional)</Label>
                <Input 
                  id="trackingId" 
                  placeholder="Ex: seunome-20" 
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="source">Fonte (opcional)</Label>
                <Input 
                  id="source" 
                  placeholder="Ex: newsletter" 
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </div>
              
              {customGeneratedLink && (
                <div className="space-y-2 pt-4">
                  <Label htmlFor="customGeneratedLink">Link Gerado</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="customGeneratedLink" 
                      value={customGeneratedLink} 
                      readOnly 
                      className="flex-1"
                    />
                    <Button onClick={handleCopyCustomLink} variant="outline">
                      Copiar
                    </Button>
                  </div>
                </div>
              )}
              
              <Button onClick={handleGenerateCustomLink} className="w-full mt-4">
                Gerar Link Personalizado
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guide">
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <CardTitle>Guia de Links de Afiliados</CardTitle>
              <CardDescription>
                Como usar links de afiliados no seu aplicativo
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">O que são links de afiliados?</h3>
                <p className="text-gray-700">
                  Links de afiliados são URLs especiais que contêm seu ID de afiliado. 
                  Quando um usuário clica nesse link e faz uma compra, você recebe uma comissão.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Como obter IDs de afiliado</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    <strong>Amazon:</strong> Cadastre-se no programa 
                    <a href="https://associados.amazon.com.br/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> Amazon Associados</a>
                  </li>
                  <li>
                    <strong>AliExpress:</strong> Cadastre-se no programa 
                    <a href="https://portals.aliexpress.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> AliExpress Affiliate Program</a>
                  </li>
                  <li>
                    <strong>Magazine Luiza:</strong> Cadastre-se no 
                    <a href="https://www.magazinevoce.com.br/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> Magazine Você</a>
                  </li>
                  <li>
                    <strong>Americanas:</strong> Cadastre-se no 
                    <a href="https://www.lomadee.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> Lomadee</a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Como usar no seu aplicativo</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                  <li>Gere o link de afiliado usando esta ferramenta</li>
                  <li>Copie o link gerado</li>
                  <li>Adicione o link ao seu produto no banco de dados Supabase</li>
                  <li>O componente ProductCard já está configurado para usar o link de afiliado</li>
                </ol>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="text-lg font-semibold mb-2 text-yellow-800">Dicas importantes</h3>
                <ul className="list-disc pl-5 space-y-2 text-yellow-800">
                  <li>Sempre divulgue que você usa links de afiliados</li>
                  <li>Verifique as regras de cada programa de afiliados</li>
                  <li>Teste seus links regularmente para garantir que estão funcionando</li>
                  <li>Use ferramentas de encurtamento de URL para links mais limpos</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}