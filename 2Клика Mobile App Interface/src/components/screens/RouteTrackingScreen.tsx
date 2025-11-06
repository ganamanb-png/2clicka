import React, { useState } from 'react';
import { GlowButton } from '../GlowButton';
import { GlassCard } from '../GlassCard';
import { RealisticMap } from '../RealisticMap';
import { X, Share2, AlertCircle, MapPin, Navigation } from 'lucide-react';

interface RouteTrackingScreenProps {
  onClose: () => void;
}

export const RouteTrackingScreen: React.FC<RouteTrackingScreenProps> = ({ onClose }) => {
  const [currentStatus, setCurrentStatus] = useState(1); // 0: Принял, 1: В пути, 2: Выполняет, 3: Завершено

  const statuses = [
    { id: 0, label: 'Принял', icon: '✓' },
    { id: 1, label: 'В пути', icon: '🚗' },
    { id: 2, label: 'Выполняет', icon: '⚙️' },
    { id: 3, label: 'Завершено', icon: '🎉' },
  ];

  return (
    <div className="fixed inset-0 bg-[#000000] z-50 flex flex-col">
      {/* Map Area */}
      <div className="relative flex-1 overflow-hidden">
        <RealisticMap>
          {/* Route line */}
          <path
            d="M 200 350 Q 280 280 350 220"
            stroke="#0A84FF"
            strokeWidth="4"
            fill="none"
            strokeDasharray="10 5"
            opacity="0.8"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="15" dur="1s" repeatCount="indefinite" />
          </path>

          {/* Executor marker - moving along route */}
          <g>
            <circle cx="280" cy="280" r="12" fill="#0A84FF" opacity="0.3">
              <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="280" cy="280" r="16" fill="#0A84FF" stroke="white" strokeWidth="2" filter="url(#glow)" />
            <path d="M 280 272 L 280 282 M 278 277 L 282 277" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Destination marker */}
          <g>
            <circle cx="350" cy="220" r="8" fill="#00ff88" opacity="0.2">
              <animate attributeName="r" values="8;14;8" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="350" cy="220" r="6" fill="#00ff88" stroke="white" strokeWidth="2" />
          </g>
        </RealisticMap>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-3 rounded-full bg-black/70 backdrop-blur-md hover:bg-black/90 transition-all shadow-lg z-20"
        >
          <X className="text-white" size={24} />
        </button>

        {/* Share button */}
        <button className="absolute top-6 right-6 p-3 rounded-full bg-black/70 backdrop-blur-md hover:bg-black/90 transition-all shadow-lg z-20">
          <Share2 className="text-white" size={24} />
        </button>

        {/* Executor info floating card */}
        <div className="absolute top-24 left-4 right-4 z-10">
          <GlassCard className="border-[#0A84FF]/30 shadow-[0_0_20px_rgba(10,132,255,0.2)]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#0066CC] flex items-center justify-center text-2xl shadow-lg">
                👨
              </div>
              <div className="flex-1">
                <h3 className="text-white">Иван Петров</h3>
                <p className="text-white/60 text-sm">Курьер • ⭐ 4.9</p>
              </div>
              <div className="text-right">
                <p className="text-[#0A84FF]">~2 мин</p>
                <p className="text-white/60 text-sm">0.5 км</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="bg-[#0A0F14] border-t border-white/10 p-6 space-y-4">
        {/* Status Bar */}
        <div className="flex items-center justify-between mb-6">
          {statuses.map((status, index) => (
            <div key={status.id} className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  index <= currentStatus
                    ? 'bg-[#0A84FF] shadow-[0_0_20px_rgba(10,132,255,0.5)]'
                    : 'bg-white/10'
                }`}
              >
                <span className="text-xl">{status.icon}</span>
              </div>
              <span
                className={`text-xs mt-2 ${
                  index <= currentStatus ? 'text-white' : 'text-white/40'
                }`}
              >
                {status.label}
              </span>
              {index < statuses.length - 1 && (
                <div
                  className={`absolute w-20 h-0.5 top-6 ${
                    index < currentStatus ? 'bg-[#0A84FF]' : 'bg-white/10'
                  }`}
                  style={{ left: `${(index + 1) * 25}%` }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Executor Info Card */}
        <GlassCard>
          <div className="flex items-center gap-4">
            <div className="text-4xl">👨</div>
            <div className="flex-1">
              <h3 className="text-white">Иван Петров</h3>
              <p className="text-white/60 text-sm">Курьер</p>
            </div>
            <div className="text-right">
              <p className="text-[#0A84FF]">~2 мин</p>
              <p className="text-white/60 text-sm">0.5 км</p>
            </div>
          </div>
        </GlassCard>

        {/* Task Info */}
        <GlassCard>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <MapPin className="text-[#0A84FF] mt-1" size={20} />
              <div className="flex-1">
                <p className="text-white/60 text-sm">Адрес доставки</p>
                <p className="text-white">Москва, ул. Ленина, 1</p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <GlowButton variant="secondary" className="flex-1">
            Позвонить
          </GlowButton>
          <GlowButton variant="secondary" className="px-6">
            <AlertCircle size={20} />
          </GlowButton>
        </div>
      </div>
    </div>
  );
};
