import { Shield, Heart, Gift, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="mb-6">
            <img 
              src="/lovable-uploads/29c76486-e58a-4151-8125-0a131064f4a8.png" 
              alt="Achadinhos Prime"
              className="w-32 h-32 mx-auto object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sobre o Achadinhos Prime
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Sua plataforma de confiança para encontrar os melhores produtos com preços reais
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Como Funciona</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            O <strong>Achadinhos Prime</strong> é um app independente que reúne os melhores produtos da internet com preços reais e ofertas verificadas. Nossa missão é facilitar sua busca por produtos de qualidade com descontos genuínos.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Utilizamos links de afiliados para manter a plataforma completamente gratuita para você. Quando você clica em "Ver Oferta", é redirecionado diretamente para a loja oficial, garantindo segurança e preços atualizados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-gradient-orange p-3 rounded-full">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">100% Seguro</h3>
            </div>
            <p className="text-gray-600">
              Todos os links direcionam para lojas oficiais e confiáveis. Sua segurança é nossa prioridade.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-gradient-orange p-3 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Curadoria</h3>
            </div>
            <p className="text-gray-600">
              Selecionamos manualmente cada produto, garantindo qualidade e bons preços.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-gradient-orange p-3 rounded-full">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Sempre Gratuito</h3>
            </div>
            <p className="text-gray-600">
              Nossa plataforma é mantida por parcerias, garantindo acesso gratuito a todos os usuários.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-gradient-orange p-3 rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Comunidade</h3>
            </div>
            <p className="text-gray-600">
              Faça parte de uma comunidade que compartilha as melhores ofertas e dicas de compra.
            </p>
          </div>
        </div>

        <div className="bg-gradient-orange rounded-3xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Nossa Missão</h2>
          <p className="text-xl leading-relaxed opacity-95">
            "Democratizar o acesso a produtos de qualidade, conectando pessoas às melhores ofertas do mercado com transparência e confiança."
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
