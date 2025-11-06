import React from 'react';
import { Home, Map, Plus, MessageCircle, User } from 'lucide-react';

interface BottomNavigationProps {
  active: string;
  onNavigate: (screen: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ active, onNavigate }) => {
  const items = [
    { id: 'home', icon: Home, label: 'Главная' },
    { id: 'map', icon: Map, label: 'Карта' },
    { id: 'create', icon: Plus, label: 'Создать' },
    { id: 'chat', icon: MessageCircle, label: 'Чат' },
    { id: 'profile', icon: User, label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0A0F14]/95 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-md mx-auto flex justify-around items-center py-2 px-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200"
            >
              <Icon
                size={24}
                className={`transition-colors duration-200 ${
                  isActive ? 'text-[#0A84FF]' : 'text-white/60'
                }`}
              />
              <span
                className={`text-xs transition-colors duration-200 ${
                  isActive ? 'text-[#0A84FF]' : 'text-white/60'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-0 w-1 h-1 rounded-full bg-[#0A84FF] shadow-[0_0_8px_rgba(10,132,255,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
