import React from 'react';
import { GlassCard } from '../GlassCard';
import { X, Star, Zap, Award, TrendingUp, Target } from 'lucide-react';

interface GamificationScreenProps {
  onClose: () => void;
}

export const GamificationScreen: React.FC<GamificationScreenProps> = ({ onClose }) => {
  const currentLevel = 12;
  const currentXP = 8500;
  const nextLevelXP = 10000;
  const progress = (currentXP / nextLevelXP) * 100;

  const badges = [
    { id: 1, name: 'Надёжный', icon: '🛡️', unlocked: true, description: '100 заказов выполнено' },
    { id: 2, name: 'Молниеносный', icon: '⚡', unlocked: true, description: 'Средний отклик < 5 мин' },
    { id: 3, name: 'Pro', icon: '💎', unlocked: true, description: 'Рейтинг 4.8+' },
    { id: 4, name: 'Мастер маршрутов', icon: '🗺️', unlocked: false, description: '50 заказов "по пути"' },
    { id: 5, name: 'Легенда', icon: '🏆', unlocked: false, description: '500 заказов выполнено' },
  ];

  const missions = [
    { id: 1, name: 'Выполни 3 заказа по пути', reward: '500 XP', progress: 2, total: 3 },
    { id: 2, name: 'Получи рейтинг 5.0 в 5 заказах', reward: '300 XP', progress: 3, total: 5 },
    { id: 3, name: 'Заработай 5000₽ за неделю', reward: '1000 XP', progress: 3200, total: 5000 },
  ];

  const perks = [
    { level: 1, name: 'Базовая комиссия', value: '15%', active: true },
    { level: 5, name: 'Сниженная комиссия', value: '12%', active: true },
    { level: 10, name: 'VIP комиссия', value: '10%', active: true },
    { level: 15, name: 'Pro комиссия', value: '8%', active: false },
  ];

  return (
    <div className="fixed inset-0 bg-[#000000] z-50 flex flex-col overflow-y-auto">
      <div className="bg-gradient-to-b from-[#0A84FF]/20 to-[#0A0F14] p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white">Достижения</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="text-white" size={24} />
          </button>
        </div>

        {/* Level Progress */}
        <GlassCard className="border-[#0A84FF]/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/60 text-sm mb-1">Ваш уровень</p>
              <div className="flex items-center gap-2">
                <p className="text-white text-4xl">{currentLevel}</p>
                <div className="px-3 py-1 rounded-full bg-[#0A84FF]/20 border border-[#0A84FF]/30">
                  <span className="text-[#0A84FF] text-sm">Pro</span>
                </div>
              </div>
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#0A84FF]/50 flex items-center justify-center shadow-[0_0_30px_rgba(10,132,255,0.5)]">
              <Star className="text-white" size={40} fill="white" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Прогресс до уровня {currentLevel + 1}</span>
              <span className="text-[#0A84FF]">{currentXP} / {nextLevelXP} XP</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0A84FF] to-[#0A84FF]/50 rounded-full shadow-[0_0_10px_rgba(10,132,255,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-white/60 text-sm text-center">
              Осталось {nextLevelXP - currentXP} XP
            </p>
          </div>
        </GlassCard>
      </div>

      <div className="flex-1 px-6 pb-6 space-y-6">
        {/* Badges */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-[#0A84FF]" size={24} />
            <h2 className="text-white">Бейджи</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => (
              <GlassCard
                key={badge.id}
                className={`text-center ${
                  badge.unlocked
                    ? 'border-[#0A84FF]/30'
                    : 'opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h3 className="text-white mb-1">{badge.name}</h3>
                <p className="text-white/60 text-xs">{badge.description}</p>
                {badge.unlocked && (
                  <div className="mt-2 text-green-400 text-xs">✓ Получен</div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Missions */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="text-[#0A84FF]" size={24} />
            <h2 className="text-white">Миссии</h2>
          </div>
          <div className="space-y-3">
            {missions.map((mission) => {
              const missionProgress = (mission.progress / mission.total) * 100;
              return (
                <GlassCard key={mission.id}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-white mb-1">{mission.name}</h3>
                      <p className="text-[#0A84FF] text-sm">+{mission.reward}</p>
                    </div>
                    <div className="text-white/60 text-sm">
                      {mission.progress} / {mission.total}
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0A84FF] rounded-full"
                      style={{ width: `${missionProgress}%` }}
                    />
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Level Perks */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-[#0A84FF]" size={24} />
            <h2 className="text-white">Бонусы за уровни</h2>
          </div>
          <div className="space-y-3">
            {perks.map((perk) => (
              <GlassCard
                key={perk.level}
                className={perk.active ? 'border-green-500/30' : 'opacity-50'}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {perk.active ? (
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-400 text-xl">✓</span>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-white/40 text-xl">🔒</span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-white">{perk.name}</h3>
                      <p className="text-white/60 text-sm">Уровень {perk.level}+</p>
                    </div>
                  </div>
                  <div className="text-[#0A84FF] text-xl">{perk.value}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Ranking */}
        <GlassCard className="border-[#0A84FF]/30">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-[#0A84FF]" size={24} />
            <h2 className="text-white">Рейтинг</h2>
          </div>
          <div className="text-center py-4">
            <p className="text-white/60 text-sm mb-2">Ваша позиция в регионе</p>
            <p className="text-white text-5xl mb-2">#47</p>
            <p className="text-white/60 text-sm">из 2,341 исполнителей</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
