/**
 * Utilitário para gerenciar links de afiliados
 */

/**
 * Adiciona parâmetros de rastreamento ao link de afiliado
 * @param baseUrl - URL base do link de afiliado
 * @param trackingId - ID de rastreamento (opcional)
 * @param source - Fonte do clique (opcional)
 * @returns URL completa com parâmetros de rastreamento
 */
export function createAffiliateLink(
  baseUrl: string, 
  trackingId?: string, 
  source?: string
): string {
  // Verifica se a URL já tem parâmetros
  const hasParams = baseUrl.includes('?');
  const connector = hasParams ? '&' : '?';
  
  let finalUrl = baseUrl;
  
  // Adiciona ID de rastreamento se fornecido
  if (trackingId) {
    finalUrl += `${connector}tag=${trackingId}`;
  }
  
  // Adiciona fonte se fornecida
  if (source) {
    finalUrl += `${hasParams || trackingId ? '&' : '?'}src=${source}`;
  }
  
  return finalUrl;
}

/**
 * Tipos de plataformas de afiliados suportadas
 */
export enum AffiliatePlatform {
  AMAZON = 'amazon',
  ALIEXPRESS = 'aliexpress',
  MAGALU = 'magalu',
  AMERICANAS = 'americanas',
  CUSTOM = 'custom'
}

/**
 * Cria um link de afiliado para uma plataforma específica
 * @param platform - Plataforma de afiliados
 * @param productId - ID do produto na plataforma
 * @param affiliateId - Seu ID de afiliado
 * @returns Link de afiliado formatado
 */
export function createPlatformAffiliateLink(
  platform: AffiliatePlatform,
  productId: string,
  affiliateId: string
): string {
  switch (platform) {
    case AffiliatePlatform.AMAZON:
      return `https://www.amazon.com.br/dp/${productId}?tag=${affiliateId}`;
    
    case AffiliatePlatform.ALIEXPRESS:
      return `https://s.click.aliexpress.com/e/_${productId}?bz=${affiliateId}`;
    
    case AffiliatePlatform.MAGALU:
      return `https://www.magazinevoce.com.br/magazineSEUNOME/${productId}/p/?utm_source=site&utm_medium=afiliados&utm_campaign=${affiliateId}`;
    
    case AffiliatePlatform.AMERICANAS:
      return `https://www.americanas.com.br/produto/${productId}?pfm_carac=afiliados&pfm_index=1&pfm_page=product&pfm_pos=product_page.rr1&pfm_type=vit_recommendation&DCSext.recom=${affiliateId}`;
    
    case AffiliatePlatform.CUSTOM:
    default:
      return `https://seusite.com.br/redirect?product=${productId}&affiliate=${affiliateId}`;
  }
}