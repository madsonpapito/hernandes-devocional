'use client';

import { useState, useEffect } from 'react';

interface UserProgress {
  streakCount: number;
  lastLoginDate: string | null;
  completedDevotionals: string[];
  totalBuildHours: number;
  badges: string[];
  journeyProgress: Record<string, number>;
}

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress>({
    streakCount: 0,
    lastLoginDate: null,
    completedDevotionals: [],
    totalBuildHours: 0,
    badges: [],
    journeyProgress: {},
  });

  const [newBadge, setNewBadge] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('hernandes_devocional_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Garantir que campos novos existam
        if (!parsed.badges) parsed.badges = [];
        if (!parsed.journeyProgress) parsed.journeyProgress = {};
        setProgress(parsed);
      } catch (e) {
        console.error('Error parsing progress', e);
      }
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('hernandes_devocional_progress', JSON.stringify(newProgress));
  };

  const checkAndAwardBadges = (updatedProgress: UserProgress): string[] => {
    const earnedNow: string[] = [];
    const currentBadges = [...updatedProgress.badges];

    // Badge: Primeira Gota (Primeiro devocional concluído)
    if (updatedProgress.completedDevotionals.length >= 1 && !currentBadges.includes('first-drop')) {
      earnedNow.push('first-drop');
      currentBadges.push('first-drop');
    }

    // Badge: Guerreiro da Oração (7 dias de streak) - Para teste, vamos baixar para 3 ou manter 7?
    // Manteremos 7 conforme o Sage Report, mas para teste imediato do user, qualquer progresso conta.
    if (updatedProgress.streakCount >= 7 && !currentBadges.includes('streak-7')) {
      earnedNow.push('streak-7');
      currentBadges.push('streak-7');
    }

    // Badge: Teólogo em Construção (10 devocionais)
    if (updatedProgress.completedDevotionals.length >= 10 && !currentBadges.includes('devotional-10')) {
      earnedNow.push('devotional-10');
      currentBadges.push('devotional-10');
    }

    // Atualiza o progresso com os novos badges se houver
    if (earnedNow.length > 0) {
      updatedProgress.badges = currentBadges;
    }

    return earnedNow;
  };

  const completeDevotional = (slug: string, isJourneyDay?: boolean, journeyId?: string) => {
    if (!progress.completedDevotionals.includes(slug)) {
      let newProgress = {
        ...progress,
        completedDevotionals: [...progress.completedDevotionals, slug],
        totalBuildHours: progress.totalBuildHours + 0.1,
      };

      // Progresso da Jornada
      if (isJourneyDay && journeyId) {
        newProgress.journeyProgress = {
          ...newProgress.journeyProgress,
          [journeyId]: (newProgress.journeyProgress[journeyId] || 0) + 1,
        };
      }
      
      // Lógica de Streak
      const today = new Date().toISOString().split('T')[0];
      if (progress.lastLoginDate !== today) {
        const lastDate = progress.lastLoginDate ? new Date(progress.lastLoginDate) : null;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (progress.lastLoginDate === yesterdayStr) {
          newProgress.streakCount += 1;
        } else if (!progress.lastLoginDate) {
          newProgress.streakCount = 1;
        } else {
          newProgress.streakCount = 1; // Quebrou a sequência
        }
        newProgress.lastLoginDate = today;
      }

      // Checar Badges
      const badgesEarned = checkAndAwardBadges(newProgress);
      if (badgesEarned.length > 0) {
        setNewBadge(badgesEarned[0]); // Notifica a UI sobre o primeiro badge ganho
      }

      saveProgress(newProgress);
    }
  };

  return {
    ...progress,
    completeDevotional,
    newBadge,
    clearNewBadge: () => setNewBadge(null),
  };
}
