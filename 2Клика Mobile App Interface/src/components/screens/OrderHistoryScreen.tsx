import React, { useState } from 'react';
import { GlassCard } from '../GlassCard';
import { BottomNavigation } from '../BottomNavigation';
import { X, Package, CheckCircle, XCircle, Clock } from 'lucide-react';

interface OrderHistoryScreenProps {
  onNavigate: (screen: string) => void;
  onClose?: () => void;
}

type OrderStatus = 'active' | 'completed' | 'cancelled';

interface Order {
  id: number;
  title: string;
  status: OrderStatus;
  date: string;
  price: number;
  executor?: string;
  category: string;
}

export const OrderHistoryScreen: React.FC<OrderHistoryScreenProps> = ({
  onNavigate,
  onClose,
}) => {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  const orders: Order[] = [
    {
      id: 1,
      title: 'Доставка посылки',
      status: 'active',
      date: 'Сегодня, 14:00',
      price: 500,
      executor: 'Иван Петров',
      category: 'Курьер',
    },
    {
      id: 2,
      title: 'Уборка квартиры',
      status: 'completed',
      date: '5 ноября',
      price: 2000,
      executor: 'Мария Сидорова',
      category: 'Уборка',
    },
    {
      id: 3,
      title: 'Ремонт крана',
      status: 'completed',
      date: '3 ноября',
      price: 1500,
      executor: 'Алексей Смирнов',
      category: 'Ремонт',
    },
    {
      id: 4,
      title: 'Сборка мебели',
      status: 'cancelled',
      date: '1 ноября',
      price: 1000,
      category: 'Мастер',
    },
  ];

  const filteredOrders = orders.filter(
    (order) => filter === 'all' || order.status === filter
  );

  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case 'active':
        return {
          icon: Clock,
          color: 'text-[#0A84FF]',
          bg: 'bg-[#0A84FF]/20',
          border: 'border-[#0A84FF]/30',
          label: 'В процессе',
        };
      case 'completed':
        return {
          icon: CheckCircle,
          color: 'text-green-400',
          bg: 'bg-green-500/20',
          border: 'border-green-500/30',
          label: 'Завершено',
        };
      case 'cancelled':
        return {
          icon: XCircle,
          color: 'text-red-400',
          bg: 'bg-red-500/20',
          border: 'border-red-500/30',
          label: 'Отменено',
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] to-[#0A0F14] pb-20">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white">История заказов</h1>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="text-white" size={24} />
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {[
            { id: 'all', label: 'Все' },
            { id: 'active', label: 'Активные' },
            { id: 'completed', label: 'Завершённые' },
            { id: 'cancelled', label: 'Отменённые' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as OrderStatus | 'all')}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                filter === tab.id
                  ? 'bg-[#0A84FF] text-white shadow-[0_0_20px_rgba(10,132,255,0.5)]'
                  : 'bg-white/5 text-white/60 border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <GlassCard className="text-center py-12">
              <Package className="text-white/40 mx-auto mb-3" size={48} />
              <p className="text-white/60">Нет заказов в этой категории</p>
            </GlassCard>
          ) : (
            filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;

              return (
                <GlassCard key={order.id} className="cursor-pointer hover:border-[#0A84FF]/50">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl ${statusInfo.bg}`}>
                      <StatusIcon className={statusInfo.color} size={24} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-white mb-1">{order.title}</h3>
                          <p className="text-white/60 text-sm">{order.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white">{order.price} ₽</p>
                        </div>
                      </div>

                      {order.executor && (
                        <p className="text-white/60 text-sm mb-2">
                          Исполнитель: {order.executor}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <p className="text-white/40 text-sm">{order.date}</p>
                        <div
                          className={`px-3 py-1 rounded-full ${statusInfo.bg} border ${statusInfo.border}`}
                        >
                          <span className={`${statusInfo.color} text-xs`}>
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              );
            })
          )}
        </div>
      </div>

      <BottomNavigation active="home" onNavigate={onNavigate} />
    </div>
  );
};
