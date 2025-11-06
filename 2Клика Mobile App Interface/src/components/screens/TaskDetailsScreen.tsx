import React from 'react';
import { GlowButton } from '../GlowButton';
import { GlassCard } from '../GlassCard';
import { X, MapPin, Clock, DollarSign, AlertCircle, MessageCircle } from 'lucide-react';

interface TaskDetailsScreenProps {
  taskId: number;
  onClose: () => void;
  onTakeTask: () => void;
  onChat: () => void;
}

export const TaskDetailsScreen: React.FC<TaskDetailsScreenProps> = ({
  onClose,
  onTakeTask,
  onChat,
}) => {
  return (
    <div className="fixed inset-0 bg-[#000000] z-50 flex flex-col overflow-y-auto">
      <div className="relative p-6">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="text-white" size={24} />
        </button>

        <div className="mb-6">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 mb-3">
            <span className="text-blue-400 text-sm">Курьер / Доставка</span>
          </div>
          <h1 className="text-white mb-2">Доставить посылку</h1>
          <p className="text-white/60">Опубликовано 15 минут назад</p>
        </div>
      </div>

      <div className="flex-1 px-6 space-y-4 pb-32">
        <GlassCard>
          <h3 className="text-white mb-3">Описание</h3>
          <p className="text-white/80">
            Мне нужно доставить посылку из точки А в точку Б в течение часа. Посылка небольшая, 
            весит около 2 кг. Обязательно наличие курьерской сумки.
          </p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-white mb-3">Детали задачи</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="text-[#0A84FF] mt-1" size={20} />
              <div className="flex-1">
                <p className="text-white/60 text-sm">Адрес</p>
                <p className="text-white">Москва, ул. Ленина, 1</p>
                <p className="text-white/40 text-sm mt-1">→ Москва, ул. Пушкина, 10</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="text-[#0A84FF] mt-1" size={20} />
              <div className="flex-1">
                <p className="text-white/60 text-sm">Время выполнения</p>
                <p className="text-white">Сегодня, 14:00 - 16:00</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="text-[#0A84FF] mt-1" size={20} />
              <div className="flex-1">
                <p className="text-white/60 text-sm">Оплата</p>
                <p className="text-white text-2xl">500 ₽</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-white mb-3">Требования</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#0A84FF]" />
              <span className="text-white/80">Наличие курьерской сумки</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#0A84FF]" />
              <span className="text-white/80">Рейтинг 4.0+</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#0A84FF]" />
              <span className="text-white/80">Опыт доставки</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-white mb-3">Заказчик</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#0A84FF]/50 flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="flex-1">
              <p className="text-white">Анна Иванова</p>
              <div className="flex items-center gap-1">
                <span className="text-[#0A84FF]">⭐ 4.8</span>
                <span className="text-white/60 text-sm">(12 заказов)</span>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="border-[#0A84FF]/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-[#0A84FF] mt-1" size={20} />
            <div>
              <p className="text-white mb-1">Важно</p>
              <p className="text-white/60 text-sm">
                Заказчик ожидает подтверждения в течение 10 минут. 
                После принятия задачи у вас будет 15 минут на прибытие.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Map */}
        <GlassCard>
          <h3 className="text-white mb-3">Местоположение</h3>
          <div className="h-48 bg-gradient-to-br from-[#0A84FF]/10 to-[#0A0F14] rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="border border-white/20" />
                ))}
              </div>
            </div>
            <div className="relative flex items-center gap-8">
              <MapPin className="text-green-500" size={40} fill="currentColor" />
              <div className="text-white/40">- - - →</div>
              <MapPin className="text-[#0A84FF]" size={40} fill="currentColor" />
            </div>
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm">
              1.2 км
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#0A0F14] border-t border-white/10 space-y-3">
        <div className="flex gap-3">
          <GlowButton onClick={onTakeTask} className="flex-1">
            Взять задачу
          </GlowButton>
          <GlowButton onClick={onChat} variant="secondary" className="px-6">
            <MessageCircle size={20} />
          </GlowButton>
        </div>
      </div>
    </div>
  );
};
