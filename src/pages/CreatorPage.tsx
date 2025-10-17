import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Trash2, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { genres, tones, storyLengths } from '@/lib/constants';

export interface Character {
  id: number;
  name: string;
  traits: string;
}

export interface StoryInputs {
  genre: string;
  tone: string;
  setting: string;
  characters: Character[];
  length: number;
}

const CreatorPage: React.FC = () => {
  const navigate = useNavigate();
  const [genre, setGenre] = useState(genres[0]);
  const [tone, setTone] = useState(tones[0]);
  const [setting, setSetting] = useState('');
  const [characters, setCharacters] = useState<Character[]>([{ id: 1, name: '', traits: '' }]);
  const [length, setLength] = useState(storyLengths.medium.value);

  const addCharacter = () => {
    setCharacters([...characters, { id: Date.now(), name: '', traits: '' }]);
  };

  const removeCharacter = (id: number) => {
    setCharacters(characters.filter(c => c.id !== id));
  };

  const updateCharacter = (id: number, field: 'name' | 'traits', value: string) => {
    setCharacters(characters.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleGenerate = () => {
    const storyInputs: StoryInputs = { genre, tone, setting, characters, length };
    navigate('/story', { state: { storyInputs } });
  };

  return (
    <div className="container mx-auto max-w-4xl py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Craft Your Story's Universe</CardTitle>
            <CardDescription>Fill in the details below and let our AI bring your story to life.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Section 1: Core Elements */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-200 border-b border-surface pb-2">Core Elements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-400">Genre</label>
                  <Select value={genre} onChange={(e) => setGenre(e.target.value)}>
                    {genres.map(g => <option key={g} value={g}>{g}</option>)}
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400">Tone / Emotion</label>
                  <Select value={tone} onChange={(e) => setTone(e.target.value)}>
                    {tones.map(t => <option key={t} value={t}>{t}</option>)}
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-400">Setting / Environment</label>
                <Input 
                  placeholder="e.g., A neon-lit cyberpunk city in 2077"
                  value={setting}
                  onChange={(e) => setSetting(e.target.value)}
                />
              </div>
            </div>

            {/* Section 2: Characters */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-200 border-b border-surface pb-2">Characters</h3>
              {characters.map((char, index) => (
                <div key={char.id} className="grid grid-cols-1 md:grid-cols-8 gap-2 items-end bg-background/50 p-3 rounded-lg">
                  <div className="md:col-span-3">
                    <label className="text-sm font-medium text-slate-400">Character Name</label>
                    <Input placeholder={`Character ${index + 1}`} value={char.name} onChange={e => updateCharacter(char.id, 'name', e.target.value)} />
                  </div>
                  <div className="md:col-span-4">
                    <label className="text-sm font-medium text-slate-400">Traits / Role</label>
                    <Input placeholder="e.g., A cynical detective with a heart of gold" value={char.traits} onChange={e => updateCharacter(char.id, 'traits', e.target.value)} />
                  </div>
                  <div className="md:col-span-1">
                    <Button variant="destructive" size="icon" onClick={() => removeCharacter(char.id)} disabled={characters.length <= 1}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="secondary" onClick={addCharacter}>
                <Plus className="mr-2 h-4 w-4" /> Add Character
              </Button>
            </div>

            {/* Section 3: Story Length */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-200 border-b border-surface pb-2">Story Length</h3>
              <div>
                <input
                  type="range"
                  min={storyLengths.short.value}
                  max={storyLengths.long.value}
                  step="10"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>Short</span>
                  <span>Medium</span>
                  <span>Long</span>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="pt-6 border-t border-surface flex justify-end">
              <Button onClick={handleGenerate} size="lg" className="px-8 !bg-secondary !text-white">
                <Wand2 className="mr-2 h-5 w-5" />
                Generate Story
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreatorPage;
