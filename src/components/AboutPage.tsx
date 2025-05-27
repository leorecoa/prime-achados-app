import Header from './Header';
import Footer from './Footer';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gradient-to-br from-orange-50 to-orange-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Sobre o Prime<span className="text-orange-600">Achados</span>
            </h1>
            
            <div className="prose prose-orange max-w-none">
              <p className="lead text-xl text-gray-700 mb-6">
                O PrimeAchados é uma plataforma dedicada a encontrar e compartilhar as melhores ofertas 
                disponíveis na internet, ajudando consumidores a economizar tempo e dinheiro.
              </p>
              
              <h2>Nossa Missão</h2>
              <p>
                Nossa missão é simplificar a busca por ofertas e promoções, reunindo em um só lugar 
                os melhores produtos com os preços mais competitivos. Acreditamos que todos merecem 
                acesso a bons produtos por preços justos, e trabalhamos diariamente para tornar isso possível.
              </p>
              
              <h2>Como Funcionamos</h2>
              <p>
                Nossa equipe de especialistas em compras monitora constantemente os principais 
                e-commerces e lojas online em busca de descontos significativos, promoções relâmpago 
                e ofertas exclusivas. Analisamos cuidadosamente cada produto, considerando:
              </p>
              
              <ul>
                <li>Qualidade e durabilidade do produto</li>
                <li>Histórico de preços</li>
                <li>Avaliações de outros consumidores</li>
                <li>Confiabilidade do vendedor</li>
                <li>Custo-benefício geral</li>
              </ul>
              
              <p>
                Apenas os produtos que atendem aos nossos rigorosos critérios são recomendados 
                em nossa plataforma, garantindo que você sempre encontre ofertas que realmente valem a pena.
              </p>
              
              <h2>Transparência</h2>
              <p>
                O PrimeAchados utiliza links de afiliados para algumas das ofertas apresentadas. 
                Isso significa que podemos receber uma pequena comissão se você realizar uma compra 
                através dos nossos links, sem nenhum custo adicional para você. Esta é uma das formas 
                que utilizamos para manter nossa plataforma funcionando e continuar oferecendo este 
                serviço gratuitamente.
              </p>
              
              <p>
                No entanto, nosso compromisso é sempre com você, o consumidor. Nossas recomendações 
                são baseadas exclusivamente na qualidade das ofertas e nunca são influenciadas por 
                comissões ou parcerias comerciais.
              </p>
              
              <h2>Entre em Contato</h2>
              <p>
                Tem alguma dúvida, sugestão ou quer nos informar sobre uma oferta imperdível? 
                Entre em contato conosco através do email <a href="mailto:contato@primeachados.com.br">contato@primeachados.com.br</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;