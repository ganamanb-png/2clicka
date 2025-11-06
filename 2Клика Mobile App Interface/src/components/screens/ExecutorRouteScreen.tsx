import React, { useState } from 'react';
import { GlowButton } from '../GlowButton';
import { GlassCard } from '../GlassCard';
import { RealisticMap } from '../RealisticMap';
import { X, Plus, Navigation, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExecutorRouteScreenProps {
  onClose: () => void;
  onStartExecution: () => void;
}

export const ExecutorRouteScreen: React.FC<ExecutorRouteScreenProps> = ({
  onClose,
  onStartExecution,
}) => {
  const [routeTasks, setRouteTasks] = useState([1]); // IDs of tasks in route

  const nearbyTasks = [
    { id: 2, title: 'Доставка продуктов', price: 300, distance: '0.2 км', position: { x: 250, y: 200 } },
    { id: 3, title: 'Забрать документы', price: 200, distance: '0.5 км', position: { x: 350, y: 320 } },
  ];

  const addTaskToRoute = (taskId: number) => {
    setRouteTasks([...routeTasks, taskId]);
  };

  return (
    <div className="fixed inset-0 bg-[#000000] z-50 flex flex-col">
      {/* Map Area */}
      <div className="relative flex-1 overflow-hidden">
        <RealisticMap>
          {/* Route line */}
          <path
            d="M 200 250 Q 250 200 300 180 T 400 350"
            stroke="#0A84FF"
            strokeWidth="4"
            fill="none"
            opacity="0.8"
          />

          {/* Start point (executor location) */}
          <g>
            <circle cx="200" cy="250" r="8" fill="#00ff88" opacity="0.3">
              <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="250" r="6" fill="#00ff88" stroke="white" strokeWidth="2" />
          </g>

          {/* Main destination */}
          <g>
            <circle cx="400" cy="350" r="12" fill="#0A84FF" opacity="0.2">
              <animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="400" cy="350" r="18" fill="#0A84FF" stroke="white" strokeWidth="2" filter="url(#glow)" />
          </g>

          {/* Nearby task markers along route */}
          {nearbyTasks.map((task) => (
            <g key={task.id}>
              <circle
                cx={task.position.x}
                cy={task.position.y}
                r="10"
                fill={routeTasks.includes(task.id) ? '#00ff88' : '#fbbf24'}
                opacity="0.2"
              >
                <animate attributeName="r" values="10;16;10" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle
                cx={task.position.x}
                cy={task.position.y}
                r="14"
                fill={routeTasks.includes(task.id) ? '#00ff88' : '#fbbf24'}
                stroke="white"
                strokeWidth="2"
                filter="url(#glow)"
              />
            </g>
          ))}
        </RealisticMap>

        {/* Nearby tasks along route - Floating Cards */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-28 left-1/2 -translate-x-1/2 z-10"
          >
            <GlassCard className="w-72 shadow-[0_0_30px_rgba(10,132,255,0.2)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg">
                  <Package className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-white">{nearbyTasks[0].title}</p>
                  <p className="text-white/60 text-xs">{nearbyTasks[0].distance} по пути</p>
                </div>
                <p className="text-[#0A84FF]">{nearbyTasks[0].price} ₽</p>
              </div>
              {!routeTasks.includes(nearbyTasks[0].id) ? (
                <GlowButton
                  onClick={() => addTaskToRoute(nearbyTasks[0].id)}
                  className="w-full text-sm py-2 flex items-center justify-center gap-1"
                >
                  <Plus size={16} />
                  Добавить к маршруту
                </GlowButton>
              ) : (
                <div className="text-center text-green-400 py-2 bg-green-500/10 rounded-xl border border-green-500/30">
                  ✓ Добавлено в маршрут
                </div>
              )}
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-64 right-8 z-10"
          >
            <GlassCard className="w-72 shadow-[0_0_30px_rgba(10,132,255,0.2)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg">
                  <Package className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-white">{nearbyTasks[1].title}</p>
                  <p className="text-white/60 text-xs">{nearbyTasks[1].distance} по пути</p>
                </div>
                <p className="text-[#0A84FF]">{nearbyTasks[1].price} ₽</p>
              </div>
              {!routeTasks.includes(nearbyTasks[1].id) ? (
                <GlowButton
                  onClick={() => addTaskToRoute(nearbyTasks[1].id)}
                  className="w-full text-sm py-2 flex items-center justify-center gap-1"
                >
                  <Plus size={16} />
                  Добавить к маршруту
                </GlowButton>
              ) : (
                <div className="text-center text-green-400 py-2 bg-green-500/10 rounded-xl border border-green-500/30">
                  ✓ Добавлено в маршрут
                </div>
              )}
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-3 rounded-full bg-black/70 backdrop-blur-md hover:bg-black/90 transition-all shadow-lg z-20"
        >
          <X className="text-white" size={24} />
        </button>
      </div>

      {/* Bottom Panel */}
      <div className="bg-gradient-to-t from-[#0A0F14] to-[#0A0F14]/95 border-t border-white/10 p-6 space-y-4">
        <GlassCard className="border-[#0A84FF]/30 shadow-[0_0_20px_rgba(10,132,255,0.2)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#0A84FF]/20 flex items-center justify-center">
                <Navigation className="text-[#0A84FF]" size={20} />
              </div>
              <h3 className="text-white">Маршрут готов</h3>
            </div>
            <div className="text-right">
              <p className="text-[#0A84FF] text-2xl">
                {routeTasks.reduce((sum, id) => {
                  const task = nearbyTasks.find((t) => t.id === id);
                  return sum + (task ? task.price : 500);
                }, 0)} ₽
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-white/80 text-sm px-3 py-2 bg-white/5 rounded-xl">
            <span>📦 {routeTasks.length} задач</span>
            <span>•</span>
            <span>📍 ~4.5 км</span>
            <span>•</span>
            <span>⏱️ ~35 мин</span>
          </div>
        </GlassCard>

        <GlowButton onClick={onStartExecution} className="w-full flex items-center justify-center gap-2">
          <Navigation size={20} />
          Начать выполнение
        </GlowButton>
      </div>
    </div>
  );
};
