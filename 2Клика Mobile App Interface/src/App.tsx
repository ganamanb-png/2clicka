import React, { useState } from 'react';
import { SplashScreen } from './components/screens/SplashScreen';
import { RoleSelectionScreen } from './components/screens/RoleSelectionScreen';
import { CustomerMapScreen } from './components/screens/CustomerMapScreen';
import { VoiceInputScreen } from './components/screens/VoiceInputScreen';
import { TaskConfirmationScreen } from './components/screens/TaskConfirmationScreen';
import { ExecutorDetailsScreen } from './components/screens/ExecutorDetailsScreen';
import { RouteTrackingScreen } from './components/screens/RouteTrackingScreen';
import { ExecutorMapScreen } from './components/screens/ExecutorMapScreen';
import { ExecutorRouteScreen } from './components/screens/ExecutorRouteScreen';
import { TaskDetailsScreen } from './components/screens/TaskDetailsScreen';
import { ChatScreen } from './components/screens/ChatScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { ExecutorProfileScreen } from './components/screens/ExecutorProfileScreen';
import { GamificationScreen } from './components/screens/GamificationScreen';
import { OrderHistoryScreen } from './components/screens/OrderHistoryScreen';

type Screen =
  | 'splash'
  | 'role-selection'
  | 'customer-map'
  | 'voice-input'
  | 'task-confirmation'
  | 'executor-details'
  | 'route-tracking'
  | 'executor-map'
  | 'executor-route'
  | 'task-details'
  | 'chat'
  | 'profile'
  | 'executor-profile'
  | 'gamification'
  | 'history';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userRole, setUserRole] = useState<'customer' | 'executor'>('customer');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedExecutorId, setSelectedExecutorId] = useState<number | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleNavigate = (screen: string) => {
    switch (screen) {
      case 'home':
        setCurrentScreen(userRole === 'customer' ? 'customer-map' : 'executor-map');
        break;
      case 'map':
        setCurrentScreen(userRole === 'customer' ? 'customer-map' : 'executor-map');
        break;
      case 'create':
        if (userRole === 'customer') {
          setCurrentScreen('voice-input');
        }
        break;
      case 'chat':
        setCurrentScreen('chat');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
      case 'gamification':
        setCurrentScreen('gamification');
        break;
      case 'history':
        setCurrentScreen('history');
        break;
      case 'executor-profile':
        setCurrentScreen('executor-profile');
        break;
      default:
        break;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onStart={() => setCurrentScreen('role-selection')} />;

      case 'role-selection':
        return (
          <RoleSelectionScreen
            onSelectRole={(role) => {
              setUserRole(role);
              setCurrentScreen(role === 'customer' ? 'customer-map' : 'executor-map');
            }}
          />
        );

      case 'customer-map':
        return (
          <CustomerMapScreen
            onNavigate={handleNavigate}
            onVoiceInput={() => setCurrentScreen('voice-input')}
            onSelectExecutor={(id) => {
              setSelectedExecutorId(id);
              setCurrentScreen('executor-details');
            }}
          />
        );

      case 'voice-input':
        return (
          <VoiceInputScreen
            onConfirm={(text) => {
              setTaskDescription(text);
              setCurrentScreen('task-confirmation');
            }}
            onClose={() => setCurrentScreen('customer-map')}
          />
        );

      case 'task-confirmation':
        return (
          <TaskConfirmationScreen
            taskDescription={taskDescription}
            onConfirm={() => setCurrentScreen('customer-map')}
            onClose={() => setCurrentScreen('customer-map')}
          />
        );

      case 'executor-details':
        return (
          <ExecutorDetailsScreen
            executorId={selectedExecutorId || 1}
            onClose={() => setCurrentScreen('customer-map')}
            onSelect={() => setCurrentScreen('route-tracking')}
            onChat={() => setCurrentScreen('chat')}
          />
        );

      case 'route-tracking':
        return <RouteTrackingScreen onClose={() => setCurrentScreen('customer-map')} />;

      case 'executor-map':
        return (
          <ExecutorMapScreen
            onNavigate={handleNavigate}
            onSelectTask={(id) => {
              setSelectedTaskId(id);
              setCurrentScreen('task-details');
            }}
            onStartRoute={() => setCurrentScreen('executor-route')}
          />
        );

      case 'executor-route':
        return (
          <ExecutorRouteScreen
            onClose={() => setCurrentScreen('executor-map')}
            onStartExecution={() => setCurrentScreen('executor-map')}
          />
        );

      case 'task-details':
        return (
          <TaskDetailsScreen
            taskId={selectedTaskId || 1}
            onClose={() => setCurrentScreen('executor-map')}
            onTakeTask={() => setCurrentScreen('executor-map')}
            onChat={() => setCurrentScreen('chat')}
          />
        );

      case 'chat':
        return (
          <ChatScreen
            onClose={() =>
              setCurrentScreen(userRole === 'customer' ? 'customer-map' : 'executor-map')
            }
          />
        );

      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} role={userRole} />;

      case 'executor-profile':
        return (
          <ExecutorProfileScreen onClose={() => setCurrentScreen('profile')} />
        );

      case 'gamification':
        return <GamificationScreen onClose={() => setCurrentScreen('profile')} />;

      case 'history':
        return <OrderHistoryScreen onNavigate={handleNavigate} />;

      default:
        return <SplashScreen onStart={() => setCurrentScreen('role-selection')} />;
    }
  };

  return (
    <div className="size-full max-w-md mx-auto bg-[#000000] relative overflow-hidden">
      {renderScreen()}
    </div>
  );
}
