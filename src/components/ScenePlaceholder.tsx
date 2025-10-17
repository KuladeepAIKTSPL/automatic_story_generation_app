import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';

const ScenePlaceholder: React.FC = () => {
  // Initialize with null to prevent rendering with an empty src
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use a unique seed for each render to get a different image from Picsum Photos.
    const seed = Date.now() + Math.random();
    setImageUrl(`https://picsum.photos/seed/${seed}/800/450`);
  }, []);

  return (
    <div className="w-full aspect-video bg-surface/50 border-2 border-dashed border-surface rounded-lg flex flex-col items-center justify-center text-slate-500 my-4 overflow-hidden relative">
      {isLoading && (
         <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/80 z-10">
            <Loader className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-sans mt-2">Generating scene...</p>
         </div>
      )}
      {/* Conditionally render the image only when imageUrl is not null */}
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="AI-Generated Scene Illustration" 
          className="w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isLoading ? 0 : 1 }}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          crossOrigin="anonymous" // Required for html2canvas to capture the image
        />
      )}
      <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
        AI-Generated Scene
      </div>
    </div>
  );
};

export default ScenePlaceholder;
