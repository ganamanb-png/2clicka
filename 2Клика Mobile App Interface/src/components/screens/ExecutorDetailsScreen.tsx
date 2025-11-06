import React from 'react';
import { GlowButton } from '../GlowButton';
import { GlassCard } from '../GlassCard';
import { X, Star, MessageCircle, Phone, MapPin, Clock } from 'lucide-react';

interface ExecutorDetailsScreenProps {
  executorId: number;
  onClose: () => void;
  onSelect: () => void;
  onChat: () => void;
}

export const ExecutorDetailsScreen: React.FC<ExecutorDetailsScreenProps> = ({
  onClose,
  onSelect,
  onChat,
}) => {
  return (
    <div className="fixed inset-0 bg-[#000000] z-50 flex flex-col overflow-y-auto">
      <div className="relative h-64 bg-gradient-to-b from-[#0A84FF]/20 to-[#0A0F14]">
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 transition-colors z-10"
        >
          <X className="text-white" size={24} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#0A84FF] to-[#0A84FF]/50 flex items-center justify-center text-5xl border-4 border-[#0A0F14]">
              👨
            </div>
            <div className="flex-1 pb-2">
              <h1 className="text-white mb-1">Иван Петров</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="text-[#0A84FF]" size={16} fill="#0A84FF" />
                  <span className="text-white">4.9</span>
                </div>
                <span className="text-white/60">•</span>
                <span className="text-white/60">234 отзыва</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 space-y-4">
        <div className="flex gap-3">
          <GlowButton onClick={onChat} variant="secondary" className="flex-1 flex items-center justify-center gap-2">
            <MessageCircle size={20} />
            Чат
          </GlowButton>
          <GlowButton variant="secondary" className="flex-1 flex items-center justify-center gap-2">
            <Phone size={20} />
            Позвонить
          </GlowButton>
        </div>

        <GlassCard>
          <h3 className="text-white mb-3">Информация</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="text-[#0A84FF]" size={20} />
              <div>
                <p className="text-white/60 text-sm">Расстояние</p>
                <p className="text-white">0.8 км от вас</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-[#0A84FF]" size={20} />
              <div>
                <p className="text-white/60 text-sm">Прибытие</p>
                <p className="text-white">~5 минут</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-white mb-3">Специализация</h3>
          <div className="flex flex-wrap gap-2">
            {['Курьер', 'Доставка', 'Экспресс'].map((tag) => (
              <div key={tag} className="px-3 py-1 rounded-full bg-[#0A84FF]/20 border border-[#0A84FF]/30">
                <span className="text-[#0A84FF] text-sm">{tag}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-white mb-3">Статистика</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/60 text-sm">Выполнено заказов</p>
              <p className="text-white text-2xl">234</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">На платформе</p>
              <p className="text-white text-2xl">2 года</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-white mb-3">Последние отзывы</h3>
          <div className="space-y-3">
            {[
              { name: 'Анна К.', rating: 5, text: 'Отличный курьер, все быстро и аккуратно!' },
              { name: 'Михаил П.', rating: 5, text: 'Рекомендую, всегда на связи' },
            ].map((review, i) => (
              <div key={i} className="pb-3 border-b border-white/10 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white">{review.name}</span>
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="text-[#0A84FF]" size={12} fill="#0A84FF" />
                    ))}
                  </div>
                </div>
                <p className="text-white/60 text-sm">{review.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Mini Map */}
        <GlassCard>
          <h3 className="text-white mb-3">Местоположение</h3>
          <div className="h-32 bg-gradient-to-br from-[#0A84FF]/10 to-[#0A0F14] rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-6 grid-rows-4 h-full w-full">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="border border-white/20" />
                ))}
              </div>
            </div>
            <div className="relative">
              <MapPin className="text-[#0A84FF]" size={32} />
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="p-6 border-t border-white/10 bg-[#0A0F14]">
        <GlowButton onClick={onSelect} className="w-full">
          Выбрать исполнителя
        </GlowButton>
      </div>
    </div>
  );
};
