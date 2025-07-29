import React from 'react';
import { Milestone } from '../types/Game';
import { Award, Check } from 'lucide-react';

interface MilestoneCardProps {
  milestone: Milestone;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone }) => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
      <div className="flex items-start space-x-3">
        <div className="bg-yellow-500 p-2 rounded-full">
          <Award className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-yellow-900">{milestone.title}</h3>
            <Check className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-sm text-yellow-800 mb-2">{milestone.description}</p>
          
          {/* Belohnungen anzeigen */}
          <div className="flex flex-wrap gap-2">
            {milestone.reward.cash && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                +€{milestone.reward.cash.toLocaleString()}
              </span>
            )}
            {milestone.reward.brandAwareness && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                +{milestone.reward.brandAwareness}% Bekanntheit
              </span>
            )}
            {milestone.reward.unlockStage && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                Neue Phase freigeschaltet
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};