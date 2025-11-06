import React from 'react';
import { GlowButton } from './GlowButton';
import { MapPin, Clock, DollarSign, X } from 'lucide-react';
import { motion } from 'motion/react';

interface TaskOfferCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    price: number;
    distance: string;
    time: string;
    address: string;
  };
  onAccept: () => void;
  onDecline: () => void;
}

export const TaskOfferCard: React.FC<TaskOfferCardProps> = ({ task, onAccept, onDecline }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed inset-x-4 bottom-24 z-50"
    >
      <div className="bg-gradient-to-br from-[#0A84FF]/20 via-[#0A0F14] to-[#0A0F14] backdrop-blur-xl border border-[#0A84FF]/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(10,132,255,0.3)]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0A84FF] flex items-center justify-center shadow-[0_0_20px_rgba(10,132,255,0.6)]">
              <span className="text-2xl">📦</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white">Новая задача!</h3>
                <div className="px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/50">
                  <span className="text-green-400 text-xs">Рядом</span>
                </div>
              </div>
              <p className="text-white/60 text-sm">{task.title}</p>
            </div>
          </div>
          <button
            onClick={onDecline}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="text-white/60" size={20} />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 text-white/80">
            <MapPin size={16} className="text-[#0A84FF]" />
            <span className="text-sm">{task.address}</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#0A84FF]" />
              <span className="text-white/80">{task.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/60">•</span>
              <span className="text-white/80">{task.distance}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <p className="text-white/60 text-xs mb-1">Оплата</p>
            <div className="flex items-center gap-1">
              <DollarSign size={20} className="text-[#0A84FF]" />
              <span className="text-white text-xl">{task.price} ₽</span>
            </div>
          </div>
          <GlowButton onClick={onAccept} className="flex-1">
            Принять
          </GlowButton>
        </div>

        <div className="mt-3 text-center">
          <p className="text-white/40 text-xs">Автоотмена через 30 сек</p>
        </div>
      </div>
    </motion.div>
  );
};
