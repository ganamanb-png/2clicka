import React, { useState } from 'react';
import { GlowButton } from '../GlowButton';
import { GlassCard } from '../GlassCard';
import { BottomNavigation } from '../BottomNavigation';
import { RealisticMap } from '../RealisticMap';
import { Mic, Search, SlidersHorizontal, Star, MapPin, Navigation2 } from 'lucide-react';

interface CustomerMapScreenProps {
  onNavigate: (screen: string) => void;
  onVoiceInput: () => void;
  onSelectExecutor: (id: number) => void;
}

const executors = [
  {
    id: 1,
    name: 'Иван Петров',
    avatar: '👨',
    rating: 4.9,
    reviews: 234,
    price: '500 ₽/ч',
    eta: '5 мин',
    distance: '0.8 км',
    category: 'Курьер',
    position: { x: 180, y: 120 }
  },
  {
    id: 2,
    name: 'Мария Сидорова',
    avatar: '👩',
    rating: 5.0,
    reviews: 189,
    price: '800 ₽/ч',
    eta: '12 мин',
    distance: '2.1 км',
    category: 'Уборка',
    position: { x: 380, y: 250 }
  },
  {
    id: 3,
    name: 'Алексей Смирнов',
    avatar: '👨‍🔧',
    rating: 4.8,
    reviews: 312,
    price: '1200 ₽/ч',
    eta: '8 мин',
    distance: '1.5 км',
    category: 'Мастер',
    position: { x: 280, y: 350 }
  },
];

export const CustomerMapScreen: React.FC<CustomerMapScreenProps> = ({
  onNavigate,
  onVoiceInput,
  onSelectExecutor
}) => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [showOnRoute, setShowOnRoute] = useState(false);

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col pb-20">
      {/* Map Area with Realistic Map */}
      <div className="relative flex-1 overflow-hidden">
        <RealisticMap>
          {/* User location */}
          <g>
            <circle cx="300" cy="250" r="12" fill="#0A84FF" opacity="0.2">
              <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="300" cy="250" r="8" fill="#0A84FF" stroke="white" strokeWidth="2" />
          </g>

          {/* Executor markers on map */}
          {executors.map((executor, index) => (
            <g
              key={executor.id}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setSelectedCard(index)}
              onClick={() => setSelectedCard(index)}
            >
              {/* Pulse effect */}
              <circle
                cx={executor.position.x}
                cy={executor.position.y}
                r="15"
                fill="#0A84FF"
                opacity="0.2"
              >
                <animate attributeName="r" values="15;25;15" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Executor avatar marker */}
              <circle
                cx={executor.position.x}
                cy={executor.position.y}
                r="18"
                fill="#0A84FF"
                stroke="white"
                strokeWidth="2"
                filter="url(#glow)"
                className={selectedCard === index ? 'opacity-100' : 'opacity-80'}
              />
              <text
                x={executor.position.x}
                y={executor.position.y + 7}
                fontSize="20"
                textAnchor="middle"
              >
                {executor.avatar}
              </text>

              {/* Rating badge */}
              <rect
                x={executor.position.x + 12}
                y={executor.position.y - 20}
                width="35"
                height="16"
                fill="#0A84FF"
                rx="8"
              />
              <text
                x={executor.position.x + 29}
                y={executor.position.y - 10}
                fontSize="9"
                fill="white"
                textAnchor="middle"
              >
                ⭐{executor.rating}
              </text>
            </g>
          ))}
        </RealisticMap>

        {/* Top Panel */}
        <div className="absolute top-0 left-0 right-0 p-4 space-y-3 z-10">
          {/* Search bar */}
          <GlassCard className="flex items-center gap-3 shadow-lg">
            <Search className="text-white/60" size={20} />
            <input
              type="text"
              placeholder="Введите адрес..."
              className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
            />
            <button className="p-2 hover:bg-white/10 rounded-xl transition-all">
              <SlidersHorizontal className="text-[#0A84FF]" size={20} />
            </button>
          </GlassCard>

          <div className="flex items-center gap-2">
            <GlassCard className="flex items-center gap-2 px-3 py-2 shadow-md">
              <div
                onClick={() => setShowOnRoute(!showOnRoute)}
                className={`w-11 h-6 rounded-full p-0.5 transition-all cursor-pointer ${
                  showOnRoute ? 'bg-[#0A84FF] shadow-[0_0_10px_rgba(10,132,255,0.5)]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform shadow-md ${
                    showOnRoute ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
              <span className="text-white text-sm">По пути</span>
            </GlassCard>
          </div>
        </div>

        {/* Voice Input Button */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-[#0A84FF] rounded-full blur-xl opacity-50 animate-pulse" />
            <button
              onClick={onVoiceInput}
              className="relative bg-gradient-to-br from-[#0A84FF] to-[#0066CC] p-6 rounded-full shadow-[0_0_40px_rgba(10,132,255,0.8)] hover:shadow-[0_0_60px_rgba(10,132,255,1)] active:scale-95 transition-all"
            >
              <Mic className="text-white" size={32} />
            </button>
          </div>
          <p className="text-white text-center mt-3 drop-shadow-lg">Сказать задачу</p>
        </div>
      </div>

      {/* Bottom Carousel */}
      <div className="absolute bottom-20 left-0 right-0 px-4 z-10">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
          {executors.map((executor, index) => (
            <div
              key={executor.id}
              className="snap-center flex-shrink-0 w-80"
              onMouseEnter={() => setSelectedCard(index)}
            >
              <GlassCard
                className={`transition-all duration-300 ${
                  selectedCard === index
                    ? 'border-[#0A84FF] shadow-[0_0_30px_rgba(10,132,255,0.4)] scale-105'
                    : 'shadow-lg'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0A84FF] to-[#0066CC] flex items-center justify-center text-3xl shadow-lg">
                      {executor.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#0A0F14]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{executor.name}</h3>
                    <p className="text-white/60 text-sm mb-2">{executor.category}</p>
                    <div className="flex items-center gap-1">
                      <Star className="text-[#0A84FF]" size={14} fill="#0A84FF" />
                      <span className="text-white text-sm">{executor.rating}</span>
                      <span className="text-white/40 text-sm">({executor.reviews})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#0A84FF] mb-1">{executor.price}</p>
                    <div className="flex items-center gap-1 text-white/60 text-sm">
                      <Navigation2 size={12} />
                      <span>{executor.eta}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-white/60 text-sm mb-3 px-3 py-2 bg-white/5 rounded-xl">
                  <MapPin size={14} className="text-[#0A84FF]" />
                  <span>{executor.distance} от вас</span>
                </div>

                <GlowButton
                  onClick={() => onSelectExecutor(executor.id)}
                  className="w-full"
                >
                  Выбрать
                </GlowButton>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation active="map" onNavigate={onNavigate} />
    </div>
  );
};
