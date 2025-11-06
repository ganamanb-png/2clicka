import React, { useState } from 'react';
import { GlowButton } from '../GlowButton';
import { GlassCard } from '../GlassCard';
import { ShoppingBag, Wrench } from 'lucide-react';

interface RoleSelectionScreenProps {
  onSelectRole: (role: 'customer' | 'executor') => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onSelectRole }) => {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'executor'>('customer');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] to-[#0A0F14] flex flex-col px-6 py-8">
      <div className="mb-8">
        <h1 className="text-white text-center mb-2">Выберите роль</h1>
        <p className="text-white/60 text-center">Вы можете переключаться между ролями в любое время</p>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <GlassCard
          onClick={() => setSelectedRole('customer')}
          className={`transition-all duration-200 ${
            selectedRole === 'customer'
              ? 'border-[#0A84FF] shadow-[0_0_20px_rgba(10,132,255,0.3)]'
              : 'border-white/10'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl ${
              selectedRole === 'customer' ? 'bg-[#0A84FF]/20' : 'bg-white/5'
            }`}>
              <ShoppingBag className={selectedRole === 'customer' ? 'text-[#0A84FF]' : 'text-white/60'} size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-1">Я заказчик</h3>
              <p className="text-white/60 text-sm">
                Создавайте задачи голосом и находите исполнителей рядом с вами
              </p>
            </div>
            {selectedRole === 'customer' && (
              <div className="w-6 h-6 rounded-full bg-[#0A84FF] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
            )}
          </div>
        </GlassCard>

        <GlassCard
          onClick={() => setSelectedRole('executor')}
          className={`transition-all duration-200 ${
            selectedRole === 'executor'
              ? 'border-[#0A84FF] shadow-[0_0_20px_rgba(10,132,255,0.3)]'
              : 'border-white/10'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl ${
              selectedRole === 'executor' ? 'bg-[#0A84FF]/20' : 'bg-white/5'
            }`}>
              <Wrench className={selectedRole === 'executor' ? 'text-[#0A84FF]' : 'text-white/60'} size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-1">Я исполнитель</h3>
              <p className="text-white/60 text-sm">
                Выполняйте задачи по пути, зарабатывайте и повышайте свой уровень
              </p>
            </div>
            {selectedRole === 'executor' && (
              <div className="w-6 h-6 rounded-full bg-[#0A84FF] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      <div className="mt-8">
        <GlowButton onClick={() => onSelectRole(selectedRole)} className="w-full">
          Продолжить
        </GlowButton>
      </div>
    </div>
  );
};
