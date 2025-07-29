import React from 'react';
import { Decision, Founder } from '../types/Game';
import { Check, Clock, DollarSign, Calendar, AlertTriangle, TrendingUp } from 'lucide-react';

interface DecisionCardProps {
  decision: Decision;
  founder: Founder;
  canAfford: boolean;
  onVote: (decisionId: string, optionId: string) => void;
}

export const DecisionCard: React.FC<DecisionCardProps> = ({ 
  decision, 
  founder,
  canAfford,
  onVote 
}) => {
  const getCategoryColor = (category: Decision['category']) => {
    switch (category) {
      case 'legal': return 'bg-gray-500';
      case 'funding': return 'bg-green-500';
      case 'product': return 'bg-blue-500';
      case 'marketing': return 'bg-blue-500';
      case 'hiring': return 'bg-purple-500';
      case 'operations': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryLabel = (category: Decision['category']) => {
    switch (category) {
      case 'legal': return 'Rechtliches';
      case 'funding': return 'Finanzierung';
      case 'product': return 'Produkt';
      case 'marketing': return 'Marketing';
      case 'hiring': return 'Personal';
      case 'operations': return 'Betrieb';
      default: return category;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(decision.category)}`}>
              {getCategoryLabel(decision.category)}
            </span>
            {decision.timeLimit && (
              <div className="flex items-center text-sm text-orange-600">
                <Clock className="w-4 h-4 mr-1" />
                {decision.timeLimit} Monate
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{decision.title}</h3>
          <p className="text-gray-600">{decision.description}</p>
          {decision.consequences && (
            <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" />
                <p className="text-sm text-yellow-800">{decision.consequences}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {decision.options.map((option) => {
          const meetsRequirements = !option.requirements || 
            ((!option.requirements.cash || canAfford) &&
             (!option.requirements.stage || true) &&
             (!option.requirements.employees || true));
          
          return (
            <div
              key={option.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                meetsRequirements
                  ? 'border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50'
                  : 'border-red-200 bg-red-50 opacity-60 cursor-not-allowed'
              }`}
              onClick={() => meetsRequirements && onVote(decision.id, option.id)}
            >
              <h4 className="font-semibold text-gray-900 mb-2">{option.text}</h4>
              
              <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  €{option.cost.toLocaleString()}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {option.timeRequired} Monat{option.timeRequired > 1 ? 'e' : ''}
                </div>
              </div>

              {/* Benefits */}
              {option.benefits && option.benefits.length > 0 && (
                <div className="mb-2">
                  <h5 className="text-xs font-medium text-green-700 mb-1">Vorteile:</h5>
                  <ul className="text-xs text-green-600 space-y-1">
                    {option.benefits.map((benefit, idx) => (
                      <li key={idx}>• {benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Risks */}
              {option.risks && option.risks.length > 0 && (
                <div className="mb-2">
                  <h5 className="text-xs font-medium text-red-700 mb-1">Risiken:</h5>
                  <ul className="text-xs text-red-600 space-y-1">
                    {option.risks.map((risk, idx) => (
                      <li key={idx}>• {risk}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Effects */}
              <div className="flex flex-wrap gap-1">
                {Object.entries(option.effects).map(([key, value]) => {
                  if (value === 0) return null;
                  return (
                    <span
                      key={key}
                      className={`px-2 py-1 rounded-full text-xs ${
                        value! > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {key}: {value! > 0 ? '+' : ''}{value}{key.includes('stress') || key.includes('energy') ? '%' : ''}
                    </span>
                  );
                })}
              </div>

              {!meetsRequirements && (
                <div className="mt-2 text-xs text-red-600">
                  ⚠️ Anforderungen nicht erfüllt
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};