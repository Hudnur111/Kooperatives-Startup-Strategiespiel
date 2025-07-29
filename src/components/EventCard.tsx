import React from 'react';
import { GameEvent } from '../types/Game';
import { AlertTriangle, TrendingUp, Zap, Award } from 'lucide-react';

interface EventCardProps {
  event: GameEvent;
  onDismiss: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onDismiss }) => {
  const getEventIcon = (type: GameEvent['type']) => {
    switch (type) {
      case 'opportunity': return TrendingUp;
      case 'challenge': return AlertTriangle;
      case 'crisis': return Zap;
      case 'milestone': return Award;
      default: return AlertTriangle;
    }
  };

  const getEventColor = (type: GameEvent['type']) => {
    switch (type) {
      case 'opportunity': return 'bg-green-500';
      case 'challenge': return 'bg-yellow-500';
      case 'crisis': return 'bg-red-500';
      case 'milestone': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventBg = (type: GameEvent['type']) => {
    switch (type) {
      case 'opportunity': return 'bg-green-50';
      case 'challenge': return 'bg-yellow-50';
      case 'crisis': return 'bg-red-50';
      case 'milestone': return 'bg-blue-50';
      default: return 'bg-gray-50';
    }
  };

  const Icon = getEventIcon(event.type);

  return (
    <div className={`rounded-xl shadow-lg p-6 ${getEventBg(event.type)} border-l-4 ${getEventColor(event.type).replace('bg-', 'border-')}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-full ${getEventColor(event.type)}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-gray-700 mb-3">{event.description}</p>
            <p className="text-sm font-medium text-gray-800">
              <strong>Auswirkung:</strong> {event.impact}
            </p>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};