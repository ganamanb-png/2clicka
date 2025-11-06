import React, { useState } from 'react';
import { GlowButton } from '../GlowButton';
import { GlassCard } from '../GlassCard';
import { X, MapPin, Clock, DollarSign, Tag } from 'lucide-react';

interface TaskConfirmationScreenProps {
  taskDescription: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const TaskConfirmationScreen: React.FC<TaskConfirmationScreenProps> = ({
  taskDescription,
  onConfirm,
  onClose,
}) => {
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  return (
    <div className="fixed inset-0 bg-[#000000] z-50 flex flex-col px-6 py-8 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white">Подтверждение задачи</h1>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="text-white" size={24} />
        </button>
      </div>

      <GlassCard className="mb-4">
        <div className="flex items-start gap-3 mb-2">
          <Tag className="text-[#0A84FF] mt-1" size={20} />
          <div className="flex-1">
            <p className="text-white/60 text-sm mb-1">Описание задачи</p>
            <p className="text-white">{taskDescription}</p>
          </div>
        </div>
      </GlassCard>

      <div className="space-y-3 mb-6">
        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#0A84FF]/20">
              <Tag className="text-[#0A84FF]" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-white/60 text-sm">Категория</p>
              <select className="bg-transparent text-white outline-none w-full mt-1">
                <option value="delivery" className="bg-[#0A0F14]">Курьер / Доставка</option>
                <option value="cleaning" className="bg-[#0A0F14]">Уборка</option>
                <option value="repair" className="bg-[#0A0F14]">Ремонт</option>
                <option value="other" className="bg-[#0A0F14]">Другое</option>
              </select>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#0A84FF]/20">
              <MapPin className="text-[#0A84FF]" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-white/60 text-sm">Адрес</p>
              <input
                type="text"
                placeholder="Москва, ул. Ленина, 1"
                className="bg-transparent text-white outline-none w-full mt-1"
                defaultValue="Москва, ул. Ленина, 1"
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#0A84FF]/20">
              <Clock className="text-[#0A84FF]" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-white/60 text-sm">Время выполнения</p>
              <input
                type="text"
                placeholder="Сегодня, 14:00 - 16:00"
                className="bg-transparent text-white outline-none w-full mt-1"
                defaultValue="Сегодня, 14:00 - 16:00"
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#0A84FF]/20">
              <DollarSign className="text-[#0A84FF]" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-white/60 text-sm">Рекомендованная цена</p>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="number"
                  placeholder="500"
                  className="bg-transparent text-white outline-none w-20"
                  defaultValue="500"
                />
                <span className="text-white">₽</span>
                <span className="text-white/40 text-sm ml-auto">на основе аналогичных задач</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard
        onClick={() => setVerifiedOnly(!verifiedOnly)}
        className={`mb-8 cursor-pointer ${
          verifiedOnly ? 'border-[#0A84FF]' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
              verifiedOnly ? 'border-[#0A84FF] bg-[#0A84FF]' : 'border-white/40'
            }`}
          >
            {verifiedOnly && <div className="w-3 h-3 rounded-sm bg-white" />}
          </div>
          <div className="flex-1">
            <p className="text-white">Только проверенные исполнители</p>
            <p className="text-white/60 text-sm">С подтверждённым рейтингом 4.5+</p>
          </div>
        </div>
      </GlassCard>

      <div className="space-y-3">
        <GlowButton onClick={onConfirm} className="w-full">
          Создать задачу
        </GlowButton>
        <GlowButton onClick={onClose} variant="secondary" className="w-full">
          Отмена
        </GlowButton>
      </div>
    </div>
  );
};
