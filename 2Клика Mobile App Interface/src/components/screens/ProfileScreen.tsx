import React from 'react';
import { GlassCard } from '../GlassCard';
import { BottomNavigation } from '../BottomNavigation';
import { ChevronRight, CreditCard, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
  role: 'customer' | 'executor';
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate, role }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] to-[#0A0F14] pb-20">
      <div className="p-6">
        {/* Profile Header */}
        <GlassCard className="mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#0A84FF]/50 flex items-center justify-center text-4xl">
              👤
            </div>
            <div className="flex-1">
              <h2 className="text-white mb-1">Александр Петров</h2>
              <p className="text-white/60">+7 (999) 123-45-67</p>
              <div className="flex items-center gap-2 mt-2">
                {role === 'executor' && (
                  <>
                    <div className="px-2 py-1 rounded-lg bg-[#0A84FF]/20 border border-[#0A84FF]/30">
                      <span className="text-[#0A84FF] text-xs">⭐ 4.9</span>
                    </div>
                    <div className="px-2 py-1 rounded-lg bg-green-500/20 border border-green-500/30">
                      <span className="text-green-400 text-xs">✓ Проверен</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Stats for Executor */}
        {role === 'executor' && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <GlassCard className="text-center">
              <p className="text-white/60 text-sm mb-1">Выполнено</p>
              <p className="text-white text-2xl">234</p>
            </GlassCard>
            <GlassCard className="text-center">
              <p className="text-white/60 text-sm mb-1">Доход</p>
              <p className="text-white text-2xl">89K</p>
            </GlassCard>
            <GlassCard className="text-center">
              <p className="text-white/60 text-sm mb-1">Уровень</p>
              <p className="text-white text-2xl">12</p>
            </GlassCard>
          </div>
        )}

        {/* Menu Items */}
        <div className="space-y-3">
          {role === 'executor' && (
            <GlassCard
              onClick={() => onNavigate('gamification')}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#0A84FF]/20">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="flex-1">
                  <p className="text-white">Достижения и уровень</p>
                  <p className="text-white/60 text-sm">Уровень 12 • 85% до следующего</p>
                </div>
                <ChevronRight className="text-white/40" size={20} />
              </div>
            </GlassCard>
          )}

          <GlassCard
            onClick={() => onNavigate('history')}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#0A84FF]/20">
                <span className="text-2xl">📋</span>
              </div>
              <div className="flex-1">
                <p className="text-white">История заказов</p>
                <p className="text-white/60 text-sm">Все ваши заказы</p>
              </div>
              <ChevronRight className="text-white/40" size={20} />
            </div>
          </GlassCard>

          <GlassCard className="cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#0A84FF]/20">
                <CreditCard className="text-[#0A84FF]" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-white">Способы оплаты</p>
                <p className="text-white/60 text-sm">Карты и кошельки</p>
              </div>
              <ChevronRight className="text-white/40" size={20} />
            </div>
          </GlassCard>

          {role === 'executor' && (
            <GlassCard
              onClick={() => onNavigate('executor-profile')}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#0A84FF]/20">
                  <Shield className="text-[#0A84FF]" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-white">Верификация</p>
                  <p className="text-white/60 text-sm">Статус: Подтверждён</p>
                </div>
                <ChevronRight className="text-white/40" size={20} />
              </div>
            </GlassCard>
          )}

          <GlassCard className="cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#0A84FF]/20">
                <Bell className="text-[#0A84FF]" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-white">Уведомления</p>
                <p className="text-white/60 text-sm">Настройка оповещений</p>
              </div>
              <ChevronRight className="text-white/40" size={20} />
            </div>
          </GlassCard>

          <GlassCard className="cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#0A84FF]/20">
                <HelpCircle className="text-[#0A84FF]" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-white">Помощь и поддержка</p>
                <p className="text-white/60 text-sm">FAQ и контакты</p>
              </div>
              <ChevronRight className="text-white/40" size={20} />
            </div>
          </GlassCard>

          <GlassCard className="cursor-pointer border-red-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-500/20">
                <LogOut className="text-red-400" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-red-400">Выйти из аккаунта</p>
              </div>
              <ChevronRight className="text-red-400/40" size={20} />
            </div>
          </GlassCard>
        </div>
      </div>

      <BottomNavigation active="profile" onNavigate={onNavigate} />
    </div>
  );
};
