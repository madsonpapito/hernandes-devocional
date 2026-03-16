'use client';

import { motion } from 'framer-motion';
import { Play, Headset, BookOpen, Quote, ChevronLeft, Share2, Heart } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useUserProgress } from '@/hooks/useUserProgress';
import devotionalsDataRaw from '@/data/initial-devotionals.json';

const devotionalsData = devotionalsDataRaw as any[];

export default function DevocionalDetalhe() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { completeDevotional, completedDevotionals } = useUserProgress();

  const devotional = devotionalsData.find(d => d.slug === slug) || devotionalsData[0];
  const isCompleted = completedDevotionals.includes(devotional.id);

  return (
    <div className="min-h-screen bg-spiritual-navy text-white">
      {/* Dynamic Header */}
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-spiritual-terracotta/40 to-spiritual-navy opacity-80" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 pb-10 z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-spiritual-gold" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-spiritual-gold/80">Devocional Diário</span>
            </div>
            <h1 className="font-serif text-3xl font-bold leading-tight">{devotional.title}</h1>
            <p className="text-white/40 text-xs font-serif italic">{devotional.scriptureRef}</p>
          </motion.div>
        </div>
        
        <button 
          onClick={() => router.back()}
          className="absolute top-12 left-6 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10 z-20"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="px-6 -mt-6 relative z-20 pb-32">
        {/* Actions Bar */}
        <div className="flex gap-3 mb-8">
          <button className="flex-1 premium-gradient h-14 rounded-2xl flex items-center justify-center gap-3 text-spiritual-navy font-bold shadow-lg shadow-spiritual-gold/20">
            <Play size={20} fill="currentColor" />
            Ouvir Devocional
          </button>
          <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
            <Share2 size={20} />
          </button>
          <button 
            onClick={() => completeDevotional(devotional.id)}
            className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all ${
              isCompleted ? 'bg-spiritual-gold border-spiritual-gold text-spiritual-navy' : 'bg-white/5 border-white/10 text-white/60'
            }`}
          >
            <Heart size={20} fill={isCompleted ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Content Tabs/Sections */}
        <div className="space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-spiritual-gold">
              <BookOpen size={18} />
              <h3 className="font-bold text-sm uppercase tracking-widest">A Palavra</h3>
            </div>
            <div className="glass-card p-6">
              <p className="text-white/80 leading-relaxed font-serif text-lg">
                <Quote className="text-spiritual-gold/20 mb-2" size={32} />
                {devotional.commentary}
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-spiritual-gold">
              <Headset size={18} />
              <h3 className="font-bold text-sm uppercase tracking-widest">Oração</h3>
            </div>
            <div className="bg-white/5 rounded-3xl p-6 border border-white/5 italic text-white/60 leading-relaxed">
              {devotional.prayer}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
