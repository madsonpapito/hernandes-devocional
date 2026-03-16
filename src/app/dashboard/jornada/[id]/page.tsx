'use client';

import { motion } from 'framer-motion';
import { Play, CheckCircle2, Lock, ChevronLeft, Calendar, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useUserProgress } from '@/hooks/useUserProgress';
import jornadasDataRaw from '@/data/jornadas.json';

const jornadasData = jornadasDataRaw as any[];

export default function JornadaDetalhe() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { journeyProgress, completedDevotionals } = useUserProgress();

  // Find current jornada data from JSON
  const currentJornada = jornadasData.find(j => j.id === id) || jornadasData[0];
  
  const completedDaysCount = journeyProgress[id] || 0;
  const progressPercent = Math.round((completedDaysCount / currentJornada.totalDays) * 100);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-spiritual-navy text-white">
      {/* Hero Header */}
      <div className="relative h-80 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b ${currentJornada.imageColor} to-spiritual-navy opacity-60`} />
        
        <button 
          onClick={() => router.push('/dashboard/biblioteca')}
          className="absolute top-12 left-6 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10 z-20"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="absolute bottom-10 left-6 right-6 z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <div className="bg-spiritual-gold/20 backdrop-blur-sm px-3 py-1 rounded-full border border-spiritual-gold/30">
                <span className="text-[10px] font-black uppercase text-spiritual-gold flex items-center gap-1">
                   <Trophy size={10} /> {currentJornada.badgeId}
                </span>
              </div>
            </div>
            <h1 className="font-serif text-3xl font-bold leading-tight">{currentJornada.title}</h1>
            <p className="text-white/60 text-sm leading-relaxed max-w-[90%]">{currentJornada.description}</p>
          </motion.div>
        </div>
      </div>

      <div className="px-6 -mt-6 relative z-20 pb-32">
        {/* Progress Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mb-8 flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center">
              <Calendar className="text-spiritual-navy" size={24} />
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Sua Jornada</p>
              <h4 className="font-bold">{completedDaysCount} / {currentJornada.totalDays} Dias Concluídos</h4>
            </div>
          </div>
          <div className="text-right">
             <div className="text-2xl font-black text-spiritual-gold">{progressPercent}%</div>
          </div>
        </motion.div>

        {/* Days List */}
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold">Roteiro da Jornada</h2>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {currentJornada.days.map((item: any, i: number) => {
              const isDayCompleted = completedDevotionals.includes(item.devotionalId);
              const isLocked = i > completedDaysCount;

              return (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className={`flex items-center justify-between p-5 rounded-[2rem] border transition-all ${
                    isDayCompleted 
                      ? 'bg-spiritual-gold/5 border-spiritual-gold/20' 
                      : isLocked 
                        ? 'bg-white/5 border-white/5 opacity-50' 
                        : 'bg-white/5 border-white/10 hover:border-spiritual-gold/30'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${
                      isDayCompleted 
                        ? 'bg-spiritual-gold text-spiritual-navy' 
                        : 'bg-white/10 text-white/40'
                    }`}>
                      {isDayCompleted ? <CheckCircle2 size={24} /> : item.day}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${isDayCompleted ? 'text-spiritual-gold' : 'text-white'}`}>
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">{item.duration}</p>
                    </div>
                  </div>

                  <div>
                    {isLocked ? (
                      <Lock size={18} className="text-white/20" />
                    ) : (
                      <Link href={`/dashboard/devocional/${item.devotionalId}`}>
                        <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          isDayCompleted 
                            ? 'bg-spiritual-gold/10 text-spiritual-gold' 
                            : 'bg-white/10 text-white hover:bg-spiritual-gold hover:text-spiritual-navy'
                        }`}>
                          <Play size={18} fill={isDayCompleted ? "none" : "currentColor"} />
                        </button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
