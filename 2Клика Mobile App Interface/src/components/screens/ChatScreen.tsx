import React, { useState } from 'react';
import { GlassCard } from '../GlassCard';
import { X, Send, Camera, Image as ImageIcon } from 'lucide-react';

interface ChatScreenProps {
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Здравствуйте! Я готов взять вашу задачу', sender: 'other', time: '14:20' },
    { id: 2, text: 'Отлично! Когда сможете приступить?', sender: 'me', time: '14:21' },
    { id: 3, text: 'Могу начать через 10 минут', sender: 'other', time: '14:22' },
  ]);
  const [inputText, setInputText] = useState('');

  const quickReplies = ['Подтверждаю', 'На месте', 'Задерживаюсь на 5 минут'];

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: inputText,
          sender: 'me',
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setInputText('');
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000000] z-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#0A0F14] border-b border-white/10 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="text-white" size={24} />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#0A84FF]/50 flex items-center justify-center text-xl">
            👨
          </div>
          <div className="flex-1">
            <h3 className="text-white">Иван Петров</h3>
            <p className="text-white/60 text-sm">онлайн</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl p-3 ${
                message.sender === 'me'
                  ? 'bg-[#0A84FF] text-white'
                  : 'bg-white/10 text-white backdrop-blur-md'
              }`}
            >
              <p>{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'me' ? 'text-white/70' : 'text-white/50'
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Replies */}
      <div className="px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => {
                setMessages([
                  ...messages,
                  {
                    id: messages.length + 1,
                    text: reply,
                    sender: 'me',
                    time: new Date().toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                  },
                ]);
              }}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm whitespace-nowrap hover:bg-white/10 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-[#0A0F14] border-t border-white/10 p-4">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Camera className="text-white/60" size={24} />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ImageIcon className="text-white/60" size={24} />
          </button>
          <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center">
            <input
              type="text"
              placeholder="Сообщение..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
            />
          </div>
          <button
            onClick={sendMessage}
            className="p-3 rounded-full bg-[#0A84FF] hover:shadow-[0_0_20px_rgba(10,132,255,0.5)] transition-all active:scale-95"
          >
            <Send className="text-white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
