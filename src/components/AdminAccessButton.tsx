import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAccessButton: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  // Sequência de teclas para ativar o botão (Ctrl + Alt + A)
  useEffect(() => {
    const keySequence: {[key: string]: boolean} = {
      'Control': false,
      'Alt': false,
      'KeyA': false
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyA' && e.ctrlKey && e.altKey) {
        setShowButton(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!showButton) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => navigate('/admin')}
        className="bg-gray-800 text-white p-2 rounded-md shadow-lg hover:bg-gray-700 transition-colors"
      >
        Painel Admin
      </button>
    </div>
  );
};

export default AdminAccessButton;