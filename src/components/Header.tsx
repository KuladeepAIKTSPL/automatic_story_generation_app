import React from 'react';
import { BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <BookMarked className="text-primary h-6 w-6" />
            StoryWeave AI
          </Link>
          <nav>
            {/* Future nav links can go here */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
