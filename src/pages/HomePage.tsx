import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { BookOpenCheck, Bot, Feather } from 'lucide-react';

const HomePage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const features = [
    {
      icon: <Feather className="h-8 w-8 text-primary" />,
      title: "Unleash Creativity",
      description: "Bring your characters to life and explore infinite worlds with a single click."
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "AI-Powered",
      description: "Leverage advanced language models to generate rich, coherent, and engaging narratives."
    },
    {
      icon: <BookOpenCheck className="h-8 w-8 text-primary" />,
      title: "Fully Customizable",
      description: "Define genres, tones, settings, and characters to craft your perfect story."
    }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-white overflow-hidden relative pt-20 pb-10 px-4">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl -z-10"></div>
      
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-50 to-slate-400"
          variants={itemVariants}
        >
          Weave Your Tale with AI
        </motion.h1>
        <motion.p 
          className="mt-4 max-w-2xl mx-auto text-lg text-slate-300"
          variants={itemVariants}
        >
          Welcome to <span className="font-bold text-primary">StoryWeave AI</span>. Your personal AI-powered storyteller. Create compelling narratives, develop characters, and explore boundless genres effortlessly.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-8">
          <Link to="/create">
            <Button size="lg" className="px-8 py-4 text-lg animate-pulse-glow !text-white !bg-secondary">
              Start Creating Your Story
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        className="mt-24 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="bg-surface/50 border border-surface p-6 rounded-xl text-center backdrop-blur-sm"
            variants={itemVariants}
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-2 text-slate-400">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomePage;
