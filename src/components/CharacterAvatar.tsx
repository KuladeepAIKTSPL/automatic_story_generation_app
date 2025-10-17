import React from 'react';

interface CharacterAvatarProps {
  name: string;
  color: string;
}

const CharacterAvatar: React.FC<CharacterAvatarProps> = ({ name, color }) => {
  const getInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length > 1) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div
      className="flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center font-bold text-black"
      style={{ backgroundColor: color }}
    >
      {getInitials(name)}
    </div>
  );
};

export default CharacterAvatar;
