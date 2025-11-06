import React from 'react';
import { GlowButton } from '../GlowButton';
import { GlassCard } from '../GlassCard';
import { X, CheckCircle, DollarSign, TrendingUp, Award } from 'lucide-react';

interface ExecutorProfileScreenProps {
  onClose: () => void;
}

export const ExecutorProfileScreen: React.FC<ExecutorProfileScreenProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-[#000000] z-50 flex flex-col overflow-y-auto">
      <div className="bg-gradient-to-b from-[#0A84FF]/20 to-[#0A0F14] p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white">Профиль исполнителя</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="text-white" size={24} />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#0A84FF]/50 flex items-center justify-center text-5xl border-4 border-[#0A0F14]">
            👨
          </div>
          <div className="flex-1">
            <h2 className="text-white mb-1">Иван Петров</h2>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#0A84FF]">⭐ 4.9</span>
              <span className="text-white/60">(234 отзыва)</span>
            </div>
            <div className="flex gap-2">
              <div className="px-2 py-1 rounded-lg bg-green-500/20 border border-green-500/30">
                <span className="text-green-400 text-xs">✓ Проверен</span>
              </div>
              <div className="px-2 py-1 rounded-lg bg-[#0A84FF]/20 border border-[#0A84FF]/30">
                <span className="text-[#0A84FF] text-xs">Pro</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <GlassCard className="text-center">
            <Award className="text-[#0A84FF] mx-auto mb-2" size={24} />
            <p className="text-white text-2xl mb-1">234</p>
            <p className="text-white/60 text-sm">Выполнено заказов</p>
          </GlassCard>

          <GlassCard className="text-center">
            <DollarSign className="text-green-400 mx-auto mb-2" size={24} />
            <p className="text-white text-2xl mb-1">89,450 ₽</p>
            <p className="text-white/60 text-sm">Общий доход</p>
          </GlassCard>

          <GlassCard className="text-center">
            <TrendingUp className="text-[#0A84FF] mx-auto mb-2" size={24} />
            <p className="text-white text-2xl mb-1">12,300 ₽</p>
            <p className="text-white/60 text-sm">Этот месяц</p>
          </GlassCard>

          <GlassCard className="text-center">
            <span className="text-3xl mx-auto mb-2 block">⏱️</span>
            <p className="text-white text-2xl mb-1">2 года</p>
            <p className="text-white/60 text-sm">На платформе</p>
          </GlassCard>
        </div>

        {/* Balance */}
        <GlassCard className="border-[#0A84FF]/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/60 text-sm mb-1">Доступно к выводу</p>
              <p className="text-white text-3xl">4,250 ₽</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-[#0A84FF]/20 flex items-center justify-center">
              <DollarSign className="text-[#0A84FF]" size={32} />
            </div>
          </div>
          <GlowButton className="w-full">Вывести деньги</GlowButton>
        </GlassCard>

        {/* Verification */}
        <GlassCard>
          <h3 className="text-white mb-4">Верификация</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-400" size={24} />
              <div className="flex-1">
                <p className="text-white">Паспорт</p>
                <p className="text-white/60 text-sm">Подтверждён</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-400" size={24} />
              <div className="flex-1">
                <p className="text-white">Самозанятый</p>
                <p className="text-white/60 text-sm">Зарегистрирован</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-400" size={24} />
              <div className="flex-1">
                <p className="text-white">Номер телефона</p>
                <p className="text-white/60 text-sm">+7 (999) 123-45-67</p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Categories */}
        <GlassCard>
          <h3 className="text-white mb-4">Категории</h3>
          <div className="flex flex-wrap gap-2">
            {['Курьер', 'Доставка', 'Экспресс', 'По городу'].map((tag) => (
              <div
                key={tag}
                className="px-4 py-2 rounded-full bg-[#0A84FF]/20 border border-[#0A84FF]/30"
              >
                <span className="text-[#0A84FF]">{tag}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Monthly Stats */}
        <GlassCard>
          <h3 className="text-white mb-4">Статистика за месяц</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Завершённых заказов</span>
              <span className="text-white">42</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#0A84FF] rounded-full" style={{ width: '85%' }} />
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-white/60">Средний рейтинг</span>
              <span className="text-white">4.9 ⭐</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#0A84FF] rounded-full" style={{ width: '98%' }} />
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-white/60">Процент принятия</span>
              <span className="text-white">92%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#0A84FF] rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
