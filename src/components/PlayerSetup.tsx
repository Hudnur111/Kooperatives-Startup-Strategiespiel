import React, { useState } from 'react';
import { User, Briefcase, TrendingUp, Code } from 'lucide-react';
import { Player } from '../types/Game';

interface PlayerSetupProps {
  onStartGame: (players: Player[]) => void;
}

const roles = [
  { id: 'marketing', name: 'Marketing', icon: TrendingUp, color: 'bg-blue-500', description: 'Markenaufbau und Kundenakquise' },
  { id: 'development', name: 'Entwicklung', icon: Code, color: 'bg-green-500', description: 'Produktentwicklung und Technologie' },
  { id: 'management', name: 'Management', icon: Briefcase, color: 'bg-purple-500', description: 'Strategie und Unternehmensführung' }
];

export const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<Partial<Player>[]>([
    { name: '', role: undefined },
    { name: '', role: undefined },
    { name: '', role: undefined }
  ]);

  const handlePlayerChange = (index: number, field: 'name' | 'role', value: string) => {
    const newPlayers = [...players];
    if (field === 'role') {
      newPlayers[index] = { ...newPlayers[index], [field]: value as Player['role'] };
    } else {
      newPlayers[index] = { ...newPlayers[index], [field]: value };
    }
    setPlayers(newPlayers);
  };

  const canStart = players.every(p => p.name && p.role) && 
    new Set(players.map(p => p.role)).size === players.length;

  const handleStartGame = () => {
    if (canStart) {
      const completePlayers: Player[] = players.map((p, index) => ({
        id: `player-${index}`,
        name: p.name!,
        role: p.role!,
        isActive: index === 0
      }));
      onStartGame(completePlayers);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Startup Strategy Game</h1>
        <p className="text-xl text-gray-600">Gründet gemeinsam euer erfolgreiches Unternehmen</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-8 text-center">Spieler-Setup</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {players.map((player, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Spieler {index + 1}</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={player.name || ''}
                  onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Spielername eingeben"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rolle</label>
                <div className="space-y-2">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = player.role === role.id;
                    const isDisabled = players.some((p, i) => i !== index && p.role === role.id);
                    
                    return (
                      <div
                        key={role.id}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected 
                            ? `${role.color} text-white border-transparent` 
                            : isDisabled
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => !isDisabled && handlePlayerChange(index, 'role', role.id)}
                      >
                        <div className="flex items-center mb-1">
                          <Icon className="w-4 h-4 mr-2" />
                          <span className="font-medium">{role.name}</span>
                        </div>
                        <p className="text-xs opacity-80">{role.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleStartGame}
            disabled={!canStart}
            className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${
              canStart
                ? 'bg-green-600 hover:bg-green-700 hover:scale-105'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Spiel starten
          </button>
          {!canStart && (
            <p className="text-sm text-gray-500 mt-2">
              Alle Spieler müssen einen Namen und eine einzigartige Rolle haben
            </p>
          )}
        </div>
      </div>
    </div>
  );
};