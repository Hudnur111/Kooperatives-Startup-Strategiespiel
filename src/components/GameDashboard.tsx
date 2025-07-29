import React from 'react';
import { Company, Player } from '../types/Game';
import { TrendingUp, Users, DollarSign, Star, Award, BarChart3 } from 'lucide-react';

interface GameDashboardProps {
  company: Company;
  players: Player[];
  currentPlayer: Player;
}

export const GameDashboard: React.FC<GameDashboardProps> = ({ company, players, currentPlayer }) => {
  const metrics = [
    { icon: DollarSign, label: 'Budget', value: `€${company.budget.toLocaleString()}`, color: 'text-green-600' },
    { icon: TrendingUp, label: 'Umsatz/Monat', value: `€${company.revenue.toLocaleString()}`, color: 'text-blue-600' },
    { icon: Users, label: 'Mitarbeiter', value: company.employees.toString(), color: 'text-purple-600' },
    { icon: BarChart3, label: 'Marktanteil', value: `${company.marketShare}%`, color: 'text-indigo-600' },
    { icon: Award, label: 'Produktqualität', value: `${company.productQuality}/100`, color: 'text-orange-600' },
    { icon: Star, label: 'Markenbekanntheit', value: `${company.brandRecognition}/100`, color: 'text-pink-600' }
  ];

  const getRoleColor = (role: Player['role']) => {
    switch (role) {
      case 'marketing': return 'bg-blue-500';
      case 'development': return 'bg-green-500';
      case 'management': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleLabel = (role: Player['role']) => {
    switch (role) {
      case 'marketing': return 'Marketing';
      case 'development': return 'Entwicklung';
      case 'management': return 'Management';
      default: return role;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
          <p className="text-gray-600">Runde {company.round}</p>
        </div>
        <div className="flex space-x-3">
          {players.map((player) => (
            <div
              key={player.id}
              className={`px-3 py-2 rounded-lg text-white text-sm font-medium ${getRoleColor(player.role)} ${
                player.isActive ? 'ring-2 ring-yellow-400' : 'opacity-70'
              }`}
            >
              <div className="flex items-center space-x-1">
                <span>{player.name}</span>
                {player.isActive && <span className="text-yellow-200">●</span>}
              </div>
              <div className="text-xs opacity-80">{getRoleLabel(player.role)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
                <Icon className={`w-6 h-6 ${metric.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Aktueller Spieler</h3>
        <div className="flex items-center space-x-3">
          <div className={`w-4 h-4 rounded-full ${getRoleColor(currentPlayer.role)}`}></div>
          <span className="font-medium">{currentPlayer.name}</span>
          <span className="text-gray-600">({getRoleLabel(currentPlayer.role)})</span>
        </div>
      </div>
    </div>
  );
};