import React, { useState, useEffect } from 'react';
import { GlowButton } from '../GlowButton';
import { GlassCard } from '../GlassCard';
import { Mic, X } from 'lucide-react';

interface VoiceInputScreenProps {
  onConfirm: (text: string) => void;
  onClose: () => void;
}

export const VoiceInputScreen: React.FC<VoiceInputScreenProps> = ({ onConfirm, onClose }) => {
  const [isRecording, setIsRecording] = useState(true);
  const [transcription, setTranscription] = useState('');
  const [pulseScale, setPulseScale] = useState(1);

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setPulseScale((prev) => (prev === 1 ? 1.2 : 1));
      }, 500);

      // Simulate recording and transcription
      setTimeout(() => {
        setIsRecording(false);
        setTranscription('Мне нужно доставить посылку из точки А в точку Б в течение часа');
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isRecording]);

  return (
    <div className="fixed inset-0 bg-[#000000] z-50 flex flex-col items-center justify-center px-6">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <X className="text-white" size={24} />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center">
        {isRecording ? (
          <>
            <div className="relative mb-8">
              {/* Pulse rings */}
              <div
                className="absolute inset-0 -m-8 rounded-full bg-[#0A84FF]/20 animate-ping"
                style={{ transform: `scale(${pulseScale})` }}
              />
              <div
                className="absolute inset-0 -m-4 rounded-full bg-[#0A84FF]/30 animate-ping"
                style={{ animationDelay: '0.2s' }}
              />
              
              {/* Mic button */}
              <div className="relative w-24 h-24 rounded-full bg-[#0A84FF] flex items-center justify-center shadow-[0_0_40px_rgba(10,132,255,0.8)]">
                <Mic className="text-white" size={48} />
              </div>
            </div>

            <h2 className="text-white text-center mb-2">Говорите...</h2>
            <p className="text-white/60 text-center">Опишите вашу задачу</p>

            {/* Waveform visualization */}
            <div className="flex items-center gap-1 mt-8">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#0A84FF] rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 40 + 10}px`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-[#0A84FF]/20 border-2 border-[#0A84FF] flex items-center justify-center mb-8">
              <Mic className="text-[#0A84FF]" size={40} />
            </div>

            <h2 className="text-white text-center mb-4">Распознано:</h2>

            <GlassCard className="w-full max-w-md mb-8">
              <p className="text-white text-center">{transcription}</p>
            </GlassCard>
          </>
        )}
      </div>

      {!isRecording && (
        <div className="w-full max-w-md space-y-3 mb-8">
          <GlowButton onClick={() => onConfirm(transcription)} className="w-full">
            Подтвердить
          </GlowButton>
          <GlowButton
            onClick={() => {
              setIsRecording(true);
              setTranscription('');
            }}
            variant="secondary"
            className="w-full"
          >
            Перезаписать
          </GlowButton>
        </div>
      )}
    </div>
  );
};
