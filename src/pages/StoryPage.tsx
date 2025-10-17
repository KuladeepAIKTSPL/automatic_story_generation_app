import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Faker, en } from '@faker-js/faker';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { StoryInputs } from './CreatorPage';
import { Button } from '@/components/ui/Button';
import StoryRenderer from '@/components/StoryRenderer';
import { Download, Sparkles, Loader, Repeat } from 'lucide-react';

export interface StoryPart {
  type: 'narration' | 'dialogue' | 'image_placeholder';
  content?: string;
  characterId?: number;
}
export type StoryContent = StoryPart[];

// Initialize faker with English locale
const faker = new Faker({ locale: [en] });

// Helper function to generate realistic English paragraphs instead of Lorem Ipsum
const generateEnglishParagraphs = (paragraphCount: number): string => {
  const paragraphs = [];
  for (let i = 0; i < paragraphCount; i++) {
    const sentenceCount = faker.number.int({ min: 3, max: 5 });
    const sentences = [];
    for (let j = 0; j < sentenceCount; j++) {
      const words = faker.word.words({ count: { min: 8, max: 15 } });
      const sentence = words.charAt(0).toUpperCase() + words.slice(1) + '.';
      sentences.push(sentence);
    }
    paragraphs.push(sentences.join(' '));
  }
  return paragraphs.join('\n\n');
};

// Mock API call
const generateStoryAPI = (inputs: StoryInputs): Promise<StoryContent> => {
  console.log("Generating story with inputs:", inputs);
  return new Promise(resolve => {
    setTimeout(() => {
      const story: StoryContent = [
        { type: 'narration', content: `In the heart of ${inputs.setting || 'Aethelgard'}, a city woven from shadows and secrets, ${inputs.characters[0]?.name || 'a lone figure'} moved with a purpose as sharp as a shard of glass. This tale, steeped in a ${inputs.tone.toLowerCase()} ${inputs.genre.toLowerCase()} atmosphere, begins on a rain-slicked cobblestone street.` },
        { type: 'image_placeholder' },
        { type: 'narration', content: generateEnglishParagraphs(1) },
        { type: 'dialogue', characterId: inputs.characters[0]?.id, content: "The city breathes secrets tonight. I can feel it in the air." },
        ...(inputs.characters.length > 1 ? [{ type: 'dialogue', characterId: inputs.characters[1]?.id, content: "Secrets are its currency. And we're here to spend." } as StoryPart] : []),
        { type: 'narration', content: generateEnglishParagraphs(Math.max(1, Math.ceil(inputs.length / 400))) },
        { type: 'dialogue', characterId: inputs.characters[0]?.id, content: "This is just the beginning. The real story is still in the shadows." },
        { type: 'narration', content: `As the twin moons cast their ethereal glow, ${inputs.characters[0]?.name || 'the figure'} knew the path ahead was fraught with peril. The story was far from over.` },
      ];
      resolve(story);
    }, 2500);
  });
};


const StoryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const storyRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [story, setStory] = useState<StoryContent | null>(null);
  const [isTyping, setIsTyping] = useState(true);
  
  const storyInputs = location.state?.storyInputs as StoryInputs;

  useEffect(() => {
    if (!storyInputs) {
      navigate('/create');
      return;
    }

    const fetchStory = async () => {
      setIsLoading(true);
      setIsTyping(true);
      setStory(null); // Clear previous story
      const generatedStory = await generateStoryAPI(storyInputs);
      setStory(generatedStory);
      setIsLoading(false);
    };

    fetchStory();
  }, [storyInputs, navigate]);

  const handleDownloadPdf = () => {
    const input = storyRef.current;
    if (input) {
      html2canvas(input, { 
        backgroundColor: '#0A0920', // background
        scale: 2,
        useCORS: true, // Important for external images
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = pdfWidth / canvasWidth;
        const finalHeight = canvasHeight * ratio;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, finalHeight);
        pdf.save(`StoryWeave-${storyInputs.genre}-${Date.now()}.pdf`);
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        >
          <Loader className="h-16 w-16 text-primary" />
        </motion.div>
        <h2 className="mt-6 text-2xl font-semibold text-white">Brewing your tale...</h2>
        <p className="text-slate-400 mt-2">Our AI is weaving characters, plot, and magic together.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-24 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-primary"/> Your Generated Story
            </h1>
            <p className="text-slate-400 mt-1">Genre: {storyInputs.genre} | Tone: {storyInputs.tone}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleDownloadPdf} disabled={isTyping || isLoading} variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="secondary" onClick={() => navigate('/create')}>
              <Repeat className="mr-2 h-4 w-4"/>
              Create Another
            </Button>
          </div>
        </div>
        
        <div 
          ref={storyRef}
          className="bg-surface/50 border border-surface rounded-xl p-4 md:p-6 max-h-[70vh] overflow-y-auto scrollbar-thin-custom"
        >
          {story && <StoryRenderer story={story} characters={storyInputs.characters} onComplete={() => setIsTyping(false)} />}
        </div>
      </motion.div>
    </div>
  );
};

export default StoryPage;
