import { Facebook, Instagram, Twitter } from 'lucide-react';
import LogoWithText from './LogoWithText';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <LogoWithText size="lg" />
            </div>
            <p className="text-gray-400 mb-4">
              Encontre as melhores ofertas e promoções da internet em um só lugar.
              Economize tempo e dinheiro com nossas recomendações diárias.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Receba as melhores ofertas diretamente no seu email.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Seu email"
                className="px-4 py-2 rounded-l-md flex-1 text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-r-md transition-colors"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex justify-center mb-4">
            <LogoWithText size="md" />
          </div>
          <p className="text-gray-500">© {currentYear} PrimeAchados. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm text-gray-500">
            Os preços e disponibilidade dos produtos são precisos na data/hora indicada e estão sujeitos a alterações.
            Qualquer informação de preço e disponibilidade exibida nos sites das lojas no momento da compra será aplicada à compra deste produto.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;