import React from 'react';
import { motion } from 'framer-motion';
import { StoryContent, StoryPart } from '@/pages/StoryPage';
import { Character } from '@/pages/CreatorPage';
import Typewriter from './Typewriter';
import CharacterAvatar from './CharacterAvatar';
import ScenePlaceholder from './ScenePlaceholder';

interface StoryRendererProps {
  story: StoryContent;
  characters: Character[];
  onComplete: () => void;
}

const avatarColors = ['#FF00E5', '#00F5FF', '#F7FF00', '#FF5733', '#33FF57'];

const StoryRenderer: React.FC<StoryRendererProps> = ({ story, characters, onComplete }) => {
  const characterMap = new Map(characters.map(c => [c.id, c]));
  const colorMap = new Map(characters.map((c, i) => [c.id, avatarColors[i % avatarColors.length]]));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-6 font-serif text-lg leading-relaxed"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onComplete}
    >
      {story.map((part, index) => (
        <motion.div key={index} variants={itemVariants}>
          {renderStoryPart(part, characterMap, colorMap)}
        </motion.div>
      ))}
    </motion.div>
  );
};

const renderStoryPart = (part: StoryPart, characterMap: Map<number, Character>, colorMap: Map<number, string>) => {
  switch (part.type) {
    case 'narration':
      return (
        <p className="text-slate-300 italic">
          <Typewriter text={part.content || ''} speed={20} />
        </p>
      );
    case 'dialogue':
      const character = characterMap.get(part.characterId!);
      const isEven = (character?.id || 0) % 2 === 0;
      return (
        <div className={`flex items-start gap-3 ${isEven ? 'flex-row-reverse' : ''}`}>
          <CharacterAvatar name={character?.name || '?'} color={colorMap.get(part.characterId!) || '#888'} />
          <div className={`flex-1 ${isEven ? 'text-right' : ''}`}>
            <p className="font-bold text-sm text-primary mb-1">{character?.name || 'Unknown'}</p>
            <div className={`relative inline-block p-3 rounded-lg ${isEven ? 'bg-secondary/20' : 'bg-primary/10'}`}>
              <p className="text-white">
                <Typewriter text={part.content || ''} speed={35} />
              </p>
            </div>
          </div>
        </div>
      );
    case 'image_placeholder':
        return <ScenePlaceholder />;
    default:
      return null;
  }
};

export default StoryRenderer;
