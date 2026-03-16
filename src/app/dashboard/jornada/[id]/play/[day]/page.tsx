'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, X, ChevronDown, Heart, MessageCircle, Share2, CheckCircle2 } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useUserProgress } from '@/hooks/useUserProgress';
import jornadasData from '@/data/jornadas.json';

export default function JourneyPlayer() {
  const params = useParams();
  const router = useRouter();
  const { id, day } = params;
  const { completeDevotional } = useUserProgress();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Find current jornada and day data
  const currentJornada = jornadasData.find(j => j.id === id);
  const dayData = currentJornada?.days.find(d => d.day === parseInt(day as string));

  useEffect(() => {
    if (isPlaying && progress < 100) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            handleCompletion();
            return 100;
          }
          return prev + 1;
        });
      }, 500); // Accelerated for demo
      return () => clearInterval(timer);
    }
  }, [isPlaying, progress]);

  const handleCompletion = () => {
    setIsPlaying(false);
    setIsCompleted(true);
    if (dayData) {
      completeDevotional(dayData.devotionalId, true, id as string);
    }
  };

  if (!dayData) return <div className="p-20 text-center">Carregando...</div>;

  return (
    <div className="fixed inset-0 z-[100] bg-spiritual-navy text-white overflow-hidden">
      {/* Immersive Background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${currentJornada?.imageColor || 'from-spiritual-gold/20'} to-spiritual-navy opacity-40`} />
      <div className="absolute inset-0 backdrop-blur-3xl" />

      {/* Header */}
      <div className="relative z-10 px-8 pt-14 pb-6 flex justify-between items-center">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <X size={20} />
        </button>
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">{currentJornada?.title}</p>
          <h2 className="text-xs font-bold text-spiritual-gold uppercase tracking-widest">Dia {day}</h2>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-8 flex flex-col items-center justify-center h-[calc(100vh-250px)]">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div 
              key="player"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="w-full flex flex-col items-center gap-12"
            >
              {/* Visualizer Placeholder */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                <motion.div 
                  animate={{ 
                    scale: isPlaying ? [1, 1.1, 1] : 1,
                    rotate: isPlaying ? 360 : 0
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-spiritual-gold/20"
                />
                <div className="w-48 h-48 rounded-[3rem] premium-gradient shadow-[0_0_80px_rgba(212,175,55,0.2)] flex items-center justify-center">
                   <div className="w-44 h-44 rounded-[2.8rem] bg-spiritual-navy/80 backdrop-blur-xl flex items-center justify-center p-8 text-center">
                      <p className="font-serif text-lg italic leading-tight text-white/90">
                        "{dayData.verse}"
                      </p>
                   </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <h1 className="font-serif text-3xl font-bold leading-tight px-4">{dayData.title}</h1>
                <p className="text-spiritual-gold text-[10px] font-black uppercase tracking-[0.4em]">Pr. Hernandes Dias Lopes</p>
              </div>

              {/* Player Controls */}
              <div className="w-full space-y-8">
                <div className="space-y-3">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-spiritual-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-black text-white/30 tracking-widest">
                    <span>{Math.floor(progress * 0.05)}:{(progress % 20).toString().padStart(2, '0')}</span>
                    <span>{dayData.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-10">
                  <button className="text-white/40 hover:text-white transition-colors">
                    <SkipBack size={32} fill="currentColor" />
                  </button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 rounded-full bg-white text-spiritual-navy flex items-center justify-center shadow-xl active:scale-90 transition-transform"
                  >
                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="translate-x-1" />}
                  </button>
                  <button className="text-white/40 hover:text-white transition-colors">
                    <SkipForward size={32} fill="currentColor" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center gap-8"
            >
              <div className="w-24 h-24 rounded-full bg-spiritual-gold flex items-center justify-center text-spiritual-navy shadow-[0_0_50px_rgba(212,175,55,0.4)]">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-3">
                <h2 className="font-serif text-3xl font-bold">Meditação Concluída!</h2>
                <p className="text-white/60 text-sm max-w-[280px]">Você avançou mais um passo na sua jornada espiritual.</p>
              </div>
              <div className="flex flex-col gap-3 w-full max-w-[200px]">
                <button 
                  onClick={() => router.back()}
                  className="w-full py-4 bg-spiritual-gold text-spiritual-navy rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className="absolute bottom-12 left-0 right-0 z-10 px-8 flex justify-around text-white/40">
        <button className="flex flex-col items-center gap-2">
          <Heart size={20} />
          <span className="text-[8px] font-black uppercase tracking-widest">Favoritar</span>
        </button>
        <button className="flex flex-col items-center gap-2">
          <MessageCircle size={20} />
          <span className="text-[8px] font-black uppercase tracking-widest">Notas</span>
        </button>
        <button className="flex flex-col items-center gap-2">
          <Share2 size={20} />
          <span className="text-[8px] font-black uppercase tracking-widest">Compartilhar</span>
        </button>
      </div>
    </div>
  );
}
