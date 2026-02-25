/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  MapPin, 
  Play, 
  ArrowRight,
  Menu,
  X,
  Eye
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PERSONAL_INFO, PROJECTS } from './constants';
import { VideoProject } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getThumbnail = (project: VideoProject) => {
  if (project.thumbnail) return project.thumbnail;
  if (project.youtubeUrl) {
    const id = getYoutubeId(project.youtubeUrl);
    if (id) return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }
  return `https://picsum.photos/seed/${project.category.toLowerCase()}/1280/720`;
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [scrolled, setScrolled] = useState(false);

  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  const filteredProjects = selectedCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedCategory);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xs">
                {PERSONAL_INFO.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <span className="font-display italic text-xl tracking-tight">{PERSONAL_INFO.name}</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Works', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-8 text-3xl font-display italic">
              {['Works', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
          <img 
            src="https://picsum.photos/seed/editor/1920/1080?blur=5" 
            className="w-full h-full object-cover opacity-40 scale-110"
            alt="Background"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 max-w-5xl text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-emerald-400 font-mono text-sm uppercase tracking-[0.3em] mb-6"
          >
            Visual Storyteller & Editor
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl font-display italic leading-[0.9] mb-8 text-gradient"
          >
            Turning Raw Footage <br /> Into Human Emotion
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="#works" className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold transition-all hover:scale-105 active:scale-95">
              View My Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="px-8 py-4 glass rounded-full font-bold hover:bg-white/10 transition-all">
              Get In Touch
            </a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/30"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-display italic mb-4">Selected Works</h2>
              <p className="text-white/50 max-w-md">A collection of projects ranging from cinematic travel films to high-energy commercial spots.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedCategory === cat 
                      ? "bg-white text-black" 
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 mb-6">
                    <img 
                      src={getThumbnail(project)} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        // Use title as seed for more relevant fallback
                        const seed = encodeURIComponent(project.title.toLowerCase().replace(/\s+/g, '-'));
                        target.src = `https://picsum.photos/seed/${seed}/1280/720`;
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a 
                        href={project.youtubeUrl || project.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:bg-emerald-400 transition-all hover:scale-110"
                      >
                        <Play className="w-6 h-6 fill-current" />
                      </a>
                    </div>

                    <div className="absolute top-4 right-4">
                       <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/10">
                          {project.category}
                        </span>
                    </div>
                  </div>

                  {/* Always Visible Info */}
                  <div className="px-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-display italic tracking-tight">{project.title}</h3>
                      {project.views && (
                        <div className={cn(
                          "flex items-center gap-1.5 px-2 py-1 rounded-md font-mono text-xs transition-colors",
                          project.category.toLowerCase() === 'ai' 
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                            : "text-white/40"
                        )}>
                          <Eye className="w-3.5 h-3.5" /> {project.views}
                        </div>
                      )}
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden glass p-2">
              <img 
                src={PERSONAL_INFO.avatar || "https://picsum.photos/seed/alex/800/1000"} 
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover rounded-2xl transition-all duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://picsum.photos/seed/alex/800/1000";
                }}
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full" />
          </div>

          <div>
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4 block">The Editor</span>
            <h2 className="text-5xl md:text-7xl font-display italic mb-8">Crafting Stories <br /> Frame by Frame</h2>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              {PERSONAL_INFO.bio}
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <h4 className="text-white/40 text-xs uppercase tracking-widest mb-2">Experience</h4>
                <p className="text-2xl font-display italic">6 tháng +</p>
              </div>
              <div>
                <h4 className="text-white/40 text-xs uppercase tracking-widest mb-2">Projects</h4>
                <p className="text-2xl font-display italic">2</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-6xl md:text-9xl font-display italic mb-12 tracking-tighter">Let's Create <br /> Something Great</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="group flex items-center gap-4 text-2xl md:text-4xl font-medium hover:text-emerald-600 transition-colors">
              <Mail className="w-8 h-8 md:w-12 md:h-12" />
              <span>{PERSONAL_INFO.email}</span>
            </a>
            <div className="flex items-center gap-4 text-2xl md:text-4xl font-medium text-black/40">
              <MapPin className="w-8 h-8 md:w-12 md:h-12" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          <div className="h-px bg-black/10 w-full mb-12" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-sm text-black/50">© 2026 {PERSONAL_INFO.name}. All Rights Reserved.</p>
            <div className="flex gap-8 text-sm font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-emerald-600 transition-colors">Back to top</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
