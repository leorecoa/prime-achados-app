import { Link } from 'react-router-dom';

interface LogoWithTextProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const LogoWithText = ({ size = 'md', showText = true }: LogoWithTextProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };

  return (
    <Link to="/" className="flex items-center">
      <img src="/logo.svg" alt="PrimeAchados" className={`${sizeClasses[size]} mr-2`} />
      {showText && (
        <span className="font-bold text-xl md:text-2xl">
          <span className="text-orange-600">Prime</span>
          <span className="text-gray-900">Achados</span>
        </span>
      )}
    </Link>
  );
};

export default LogoWithText;