import React, { useState, useEffect } from 'react';
import { GlowButton } from '../GlowButton';
import { GlassCard } from '../GlassCard';
import { BottomNavigation } from '../BottomNavigation';
import { RealisticMap } from '../RealisticMap';
import { TaskOfferCard } from '../TaskOfferCard';
import { Search, SlidersHorizontal, Navigation, Package, Sparkles, Wrench, MapPin, Play, Pause } from 'lucide-react';

interface ExecutorMapScreenProps {
  onNavigate: (screen: string) => void;
  onSelectTask: (id: number) => void;
  onStartRoute: () => void;
}

const tasks = [
  {
    id: 1,
    title: 'Доставить посылку',
    category: 'courier',
    icon: Package,
    description: 'Доставка из пункта А в пункт Б',
    price: 500,
    distance: '1.2 км',
    time: 'Сегодня, 14:00',
    address: 'ул. Ленина, 15',
    position: { x: 200, y: 150 }
  },
  {
    id: 2,
    title: 'Уборка квартиры',
    category: 'cleaning',
    icon: Sparkles,
    description: '2-комнатная квартира, генеральная уборка',
    price: 2000,
    distance: '2.5 км',
    time: 'Сегодня, 16:00',
    address: 'пр. Мира, 34',
    position: { x: 420, y: 280 }
  },
  {
    id: 3,
    title: 'Ремонт крана',
    category: 'repair',
    icon: Wrench,
    description: 'Замена смесителя на кухне',
    price: 1500,
    distance: '0.8 км',
    time: 'Завтра, 10:00',
    address: 'ул. Пушкина, 8',
    position: { x: 320, y: 380 }
  },
];

export const ExecutorMapScreen: React.FC<ExecutorMapScreenProps> = ({
  onNavigate,
  onSelectTask,
  onStartRoute,
}) => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [showOnRoute, setShowOnRoute] = useState(false);
  const [isReadyForWork, setIsReadyForWork] = useState(false);
  const [showTaskOffer, setShowTaskOffer] = useState(false);
  const [currentTaskOffer, setCurrentTaskOffer] = useState(tasks[0]);
  const [hasActiveRoute, setHasActiveRoute] = useState(false);

  // Simulate task offers when ready for work
  useEffect(() => {
    if (isReadyForWork && !hasActiveRoute) {
      const timer = setTimeout(() => {
        setCurrentTaskOffer(tasks[Math.floor(Math.random() * tasks.length)]);
        setShowTaskOffer(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isReadyForWork, hasActiveRoute]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'courier':
        return 'bg-blue-500';
      case 'cleaning':
        return 'bg-purple-500';
      case 'repair':
        return 'bg-orange-500';
      default:
        return 'bg-[#0A84FF]';
    }
  };

  const handleAcceptTask = () => {
    setShowTaskOffer(false);
    setHasActiveRoute(true);
    onStartRoute();
  };

  const handleDeclineTask = () => {
    setShowTaskOffer(false);
  };

  const toggleReadyForWork = () => {
    setIsReadyForWork(!isReadyForWork);
    if (!isReadyForWork) {
      setHasActiveRoute(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col pb-20">
      {/* Map Area */}
      <div className="relative flex-1 overflow-hidden">
        <RealisticMap>
          {/* Executor current location */}
          <g>
            <circle cx="300" cy="250" r="12" fill="#00ff88" opacity="0.2">
              <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="300" cy="250" r="8" fill="#00ff88" stroke="white" strokeWidth="2" />
            {isReadyForWork && (
              <circle cx="300" cy="250" r="25" fill="none" stroke="#00ff88" strokeWidth="2" opacity="0.5">
                <animate attributeName="r" values="25;35;25" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="1.5s" repeatCount="indefinite" />
              </circle>
            )}
          </g>

          {/* Test route if active */}
          {hasActiveRoute && (
            <g>
              <path
                d="M 300 250 Q 350 200 400 180"
                stroke="#0A84FF"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10 5"
                opacity="0.8"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="15" dur="1s" repeatCount="indefinite" />
              </path>
              <circle cx="400" cy="180" r="8" fill="#0A84FF" stroke="white" strokeWidth="2" />
            </g>
          )}

          {/* Task markers on map */}
          {tasks.map((task, index) => {
            const Icon = task.icon;
            return (
              <g
                key={task.id}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setSelectedCard(index)}
                onClick={() => setSelectedCard(index)}
              >
                {/* Pulse for nearby tasks */}
                {isReadyForWork && (
                  <circle
                    cx={task.position.x}
                    cy={task.position.y}
                    r="15"
                    fill="#0A84FF"
                    opacity="0.2"
                  >
                    <animate attributeName="r" values="15;25;15" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Task marker */}
                <circle
                  cx={task.position.x}
                  cy={task.position.y}
                  r="20"
                  fill={getCategoryColor(task.category).replace('bg-', '#')}
                  stroke="white"
                  strokeWidth="2"
                  filter="url(#glow)"
                  className={selectedCard === index ? 'opacity-100' : 'opacity-80'}
                />

                {/* Price tag */}
                <rect
                  x={task.position.x - 25}
                  y={task.position.y - 40}
                  width="50"
                  height="18"
                  fill="white"
                  rx="9"
                />
                <text
                  x={task.position.x}
                  y={task.position.y - 28}
                  fontSize="10"
                  fill="black"
                  textAnchor="middle"
                >
                  {task.price} ₽
                </text>
              </g>
            );
          })}
        </RealisticMap>

        {/* Top Panel */}
        <div className="absolute top-0 left-0 right-0 p-4 space-y-3 z-10">
          <GlassCard className="flex items-center gap-3 shadow-lg">
            <Search className="text-white/60" size={20} />
            <input
              type="text"
              placeholder="Поиск задач..."
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
              <span className="text-white text-sm">Показывать по пути</span>
            </GlassCard>
          </div>
        </div>

        {/* Ready for Work Toggle */}
        <div className="absolute top-32 left-4 right-4 z-10">
          <GlassCard
            onClick={toggleReadyForWork}
            className={`cursor-pointer transition-all duration-300 ${
              isReadyForWork
                ? 'border-green-500 shadow-[0_0_30px_rgba(0,255,136,0.3)] bg-green-500/10'
                : 'border-white/20 shadow-lg'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  isReadyForWork
                    ? 'bg-green-500 shadow-[0_0_20px_rgba(0,255,136,0.5)]'
                    : 'bg-white/10'
                }`}
              >
                {isReadyForWork ? (
                  <Pause className="text-white" size={28} />
                ) : (
                  <Play className="text-white" size={28} />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`mb-1 ${isReadyForWork ? 'text-green-400' : 'text-white'}`}>
                  {isReadyForWork ? 'Вы на линии' : 'Готов к работе'}
                </h3>
                <p className="text-white/60 text-sm">
                  {isReadyForWork
                    ? 'Вы будете получать предложения задач'
                    : 'Нажмите чтобы начать получать заказы'}
                </p>
              </div>
              {isReadyForWork && (
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,136,0.8)]" />
              )}
            </div>
          </GlassCard>
        </div>

        {/* Start Route Button */}
        {!hasActiveRoute && (
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-[#0A84FF] rounded-full blur-xl opacity-50" />
              <button
                onClick={onStartRoute}
                className="relative bg-gradient-to-br from-[#0A84FF] to-[#0066CC] px-6 py-3 rounded-full shadow-[0_0_30px_rgba(10,132,255,0.8)] hover:shadow-[0_0_40px_rgba(10,132,255,1)] active:scale-95 transition-all flex items-center gap-2"
              >
                <Navigation className="text-white" size={24} />
                <span className="text-white">Построить маршрут</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Carousel */}
      <div className="absolute bottom-20 left-0 right-0 px-4 z-10">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
          {tasks.map((task, index) => {
            const Icon = task.icon;
            return (
              <div
                key={task.id}
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
                    <div className={`p-3 rounded-2xl ${getCategoryColor(task.category)} shadow-lg`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white mb-1">{task.title}</h3>
                      <p className="text-white/60 text-sm line-clamp-2">{task.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#0A84FF] text-xl">{task.price} ₽</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-white/60 text-sm mb-3 px-3 py-2 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-[#0A84FF]" />
                      <span>{task.distance}</span>
                    </div>
                    <span>•</span>
                    <span>🕐 {task.time}</span>
                  </div>

                  <GlowButton
                    onClick={() => onSelectTask(task.id)}
                    className="w-full"
                  >
                    Взять задачу
                  </GlowButton>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Offer Card */}
      {showTaskOffer && (
        <TaskOfferCard
          task={currentTaskOffer}
          onAccept={handleAcceptTask}
          onDecline={handleDeclineTask}
        />
      )}

      <BottomNavigation active="map" onNavigate={onNavigate} />
    </div>
  );
};
