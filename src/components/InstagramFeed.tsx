import { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const InstagramFeed = () => {
  // Normalmente buscaríamos posts do Instagram via API
  // Aqui usamos dados simulados para demonstração
  const [posts, setPosts] = useState([
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&format=webp',
      caption: 'Smartphone com super desconto! 🔥',
      likes: 45,
      comments: 12
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&format=webp',
      caption: 'Fones de ouvido com cancelamento de ruído! 🎧',
      likes: 32,
      comments: 8
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1581269876861-82cce4f6e83b?w=400&h=400&fit=crop&format=webp',
      caption: 'Cafeteira automática com 40% OFF! ☕',
      likes: 67,
      comments: 15
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&format=webp',
      caption: 'Kit skincare completo com super desconto! ✨',
      likes: 89,
      comments: 24
    }
  ]);

  return (
    <div className="py-12 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4">
        {/* Cabeçalho da seção */}
        <div className="flex flex-col items-center mb-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-4"
          >
            {/* Logo do Instagram com efeito luxuoso */}
            <div className="absolute -inset-2 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 rounded-full blur-md opacity-70"></div>
            <div className="relative bg-white p-4 rounded-full shadow-xl">
              <Instagram className="w-8 h-8 text-orange-600" />
            </div>
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-rose-500">
            Siga-nos no Instagram
          </h2>
          
          <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-rose-500 rounded-full mb-4"></div>
          
          <a 
            href="https://www.instagram.com/bazarachadinhosprime/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
          >
            <span>@bazarachadinhosprime</span>
            <ExternalLinkIcon className="w-4 h-4" />
          </a>
        </div>
        
        {/* Grade de posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/bazarachadinhosprime/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Imagem do post */}
              <div className="aspect-square overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay com informações */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white text-sm line-clamp-2 mb-2">{post.caption}</p>
                <div className="flex items-center space-x-3 text-white/90 text-xs">
                  <span className="flex items-center">
                    <HeartIcon className="w-3 h-3 mr-1" /> {post.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageIcon className="w-3 h-3 mr-1" /> {post.comments}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        
        {/* Botão para ver mais */}
        <div className="flex justify-center mt-8">
          <a 
            href="https://www.instagram.com/bazarachadinhosprime/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-orange-600 to-rose-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex items-center space-x-2"
          >
            <span>Ver mais no Instagram</span>
            <ExternalLinkIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

// Ícones simples para evitar dependências extras
const HeartIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const MessageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

export default InstagramFeed;