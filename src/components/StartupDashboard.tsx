import React from 'react';
import { Startup, Founder } from '../types/Game';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Award, 
  Star,
  Battery,
  AlertTriangle,
  Building,
  Calendar
} from 'lucide-react';

interface StartupDashboardProps {
  startup: Startup;
  founder: Founder;
}

export const StartupDashboard: React.FC<StartupDashboardProps> = ({ startup, founder }) => {
  const getStageLabel = (stage: Startup['stage']) => {
    switch (stage) {
      case 'idea': return 'Ideenphase';
      case 'validation': return 'Validierung';
      case 'mvp': return 'MVP Entwicklung';
      case 'launch': return 'Markteinführung';
      case 'growth': return 'Wachstum';
      case 'scale': return 'Skalierung';
      default: return stage;
    }
  };

  const getStageColor = (stage: Startup['stage']) => {
    switch (stage) {
      case 'idea': return 'bg-gray-500';
      case 'validation': return 'bg-yellow-500';
      case 'mvp': return 'bg-blue-500';
      case 'launch': return 'bg-green-500';
      case 'growth': return 'bg-purple-500';
      case 'scale': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const runwayMonths = startup.monthlyBurn > 0 ? Math.floor(startup.cash / startup.monthlyBurn) : 999;
  const isLowCash = runwayMonths < 3;

  const metrics = [
    { 
      icon: DollarSign, 
      label: 'Kapital', 
      value: `€${startup.cash.toLocaleString()}`, 
      color: isLowCash ? 'text-red-600' : 'text-green-600',
      trend: runwayMonths < 6 ? 'down' : 'up'
    },
    { 
      icon: TrendingDown, 
      label: 'Monatliche Kosten', 
      value: `€${startup.monthlyBurn.toLocaleString()}`, 
      color: 'text-red-600' 
    },
    { 
      icon: TrendingUp, 
      label: 'Monatlicher Umsatz', 
      value: `€${startup.monthlyRevenue.toLocaleString()}`, 
      color: 'text-green-600' 
    },
    { 
      icon: Target, 
      label: 'Kunden', 
      value: startup.customers.toString(), 
      color: 'text-blue-600' 
    },
    { 
      icon: Users, 
      label: 'Mitarbeiter', 
      value: startup.employees.toString(), 
      color: 'text-purple-600' 
    },
    { 
      icon: Award, 
      label: 'Produktentwicklung', 
      value: `${startup.productDevelopment}%`, 
      color: 'text-indigo-600' 
    },
    { 
      icon: Star, 
      label: 'Marktvalidierung', 
      value: `${startup.marketValidation}%`, 
      color: 'text-pink-600' 
    },
    { 
      icon: TrendingUp, 
      label: 'Markenbekanntheit', 
      value: `${startup.brandAwareness}%`, 
      color: 'text-orange-600' 
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{startup.name}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStageColor(startup.stage)}`}>
              {getStageLabel(startup.stage)}
            </span>
            <div className="flex items-center text-gray-600">
              <Building className="w-4 h-4 mr-1" />
              <span className="text-sm">{startup.legalForm || 'Noch nicht gegründet'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-sm">Monat {startup.month}</span>
            </div>
          </div>
        </div>

        {/* Founder Status */}
        <div className="bg-gray-50 rounded-lg p-4 min-w-[200px]">
          <h3 className="font-semibold text-gray-900 mb-2">{founder.name}</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Battery className="w-4 h-4 mr-1 text-green-600" />
                <span className="text-sm">Energie</span>
              </div>
              <span className={`text-sm font-bold ${founder.energy < 30 ? 'text-red-600' : 'text-green-600'}`}>
                {founder.energy}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1 text-orange-600" />
                <span className="text-sm">Stress</span>
              </div>
              <span className={`text-sm font-bold ${founder.stress > 70 ? 'text-red-600' : 'text-orange-600'}`}>
                {founder.stress}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Runway Warning */}
      {isLowCash && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <div>
              <h4 className="font-semibold text-red-800">Liquiditätswarnung!</h4>
              <p className="text-red-700 text-sm">
                Bei aktuellen Ausgaben reicht dein Kapital nur noch {runwayMonths} Monate.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <p className={`text-xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
                <div className="flex flex-col items-center">
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                  {metric.trend && (
                    <div className="mt-1">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bars */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Produktentwicklung</h4>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, startup.productDevelopment)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{startup.productDevelopment}% abgeschlossen</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Marktvalidierung</h4>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-pink-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, startup.marketValidation)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{startup.marketValidation}% validiert</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Markenbekanntheit</h4>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, startup.brandAwareness)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{startup.brandAwareness}% Bekanntheit</p>
        </div>
      </div>
    </div>
  );
};