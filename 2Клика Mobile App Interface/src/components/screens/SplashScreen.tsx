import React from 'react';
import { GlowButton } from '../GlowButton';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] to-[#0A0F14] flex flex-col items-center justify-center px-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative mb-12">
          <div className="absolute inset-0 blur-3xl bg-[#0A84FF] opacity-30 rounded-full" />
          <div className="relative text-6xl mb-4 text-white text-center">
            2<span className="text-[#0A84FF]">Клика</span>
          </div>
        </div>
        
        <p className="text-white/80 text-center text-xl max-w-sm mb-2">
          Скажи задачу — и она будет выполнена
        </p>
        
        <div className="flex gap-2 items-center text-[#0A84FF] text-sm mt-4">
          <div className="w-2 h-2 rounded-full bg-[#0A84FF] shadow-[0_0_10px_rgba(10,132,255,0.8)]" />
          <span>Быстро</span>
          <div className="w-1 h-1 rounded-full bg-white/30 mx-2" />
          <div className="w-2 h-2 rounded-full bg-[#0A84FF] shadow-[0_0_10px_rgba(10,132,255,0.8)]" />
          <span>Просто</span>
          <div className="w-1 h-1 rounded-full bg-white/30 mx-2" />
          <div className="w-2 h-2 rounded-full bg-[#0A84FF] shadow-[0_0_10px_rgba(10,132,255,0.8)]" />
          <span>Надёжно</span>
        </div>
      </div>
      
      <div className="w-full max-w-sm mb-12">
        <GlowButton onClick={onStart} className="w-full">
          Начать
        </GlowButton>
      </div>
    </div>
  );
};
