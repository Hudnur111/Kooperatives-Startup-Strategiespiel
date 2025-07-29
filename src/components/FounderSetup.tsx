import React, { useState } from 'react';
import { User, Briefcase, Code, TrendingUp, Users } from 'lucide-react';
import { Founder } from '../types/Game';

interface FounderSetupProps {
  onStartGame: (founder: Founder, startupName: string, industry: string) => void;
}

const industries = [
  { id: 'fintech', name: 'FinTech', description: 'Digitale Finanzdienstleistungen' },
  { id: 'ecommerce', name: 'E-Commerce', description: 'Online-Handel und Marktplätze' },
  { id: 'saas', name: 'SaaS', description: 'Software as a Service' },
  { id: 'healthtech', name: 'HealthTech', description: 'Digitale Gesundheitslösungen' },
  { id: 'edtech', name: 'EdTech', description: 'Bildungstechnologie' },
  { id: 'proptech', name: 'PropTech', description: 'Immobilientechnologie' }
];

export const FounderSetup: React.FC<FounderSetupProps> = ({ onStartGame }) => {
  const [founderName, setFounderName] = useState('');
  const [startupName, setStartupName] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [skills, setSkills] = useState({
    business: 50,
    technical: 50,
    marketing: 50,
    leadership: 50
  });

  const totalSkillPoints = Object.values(skills).reduce((sum, skill) => sum + skill, 0);
  const maxSkillPoints = 250;
  const remainingPoints = maxSkillPoints - totalSkillPoints;

  const handleSkillChange = (skillName: keyof typeof skills, value: number) => {
    const newSkills = { ...skills, [skillName]: value };
    const newTotal = Object.values(newSkills).reduce((sum, skill) => sum + skill, 0);
    
    if (newTotal <= maxSkillPoints) {
      setSkills(newSkills);
    }
  };

  const canStart = founderName && startupName && selectedIndustry && remainingPoints >= 0;

  const handleStartGame = () => {
    if (canStart) {
      const founder: Founder = {
        id: 'founder-1',
        name: founderName,
        skills,
        energy: 100,
        stress: 0
      };
      onStartGame(founder, startupName, selectedIndustry);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Startup Simulator Deutschland</h1>
        <p className="text-xl text-gray-600">Gründe dein eigenes Unternehmen und erlebe den realen Startup-Alltag</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-8 text-center">Gründer-Profil erstellen</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Persönliche Daten */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Dein Name
              </label>
              <input
                type="text"
                value={founderName}
                onChange={(e) => setFounderName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Max Mustermann"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Startup Name
              </label>
              <input
                type="text"
                value={startupName}
                onChange={(e) => setStartupName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="InnovateTech GmbH"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Branche
              </label>
              <div className="grid grid-cols-2 gap-2">
                {industries.map((industry) => (
                  <div
                    key={industry.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedIndustry === industry.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedIndustry(industry.id)}
                  >
                    <div className="font-medium text-sm">{industry.name}</div>
                    <div className="text-xs opacity-70">{industry.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Fähigkeiten verteilen</h3>
              <span className={`text-sm font-medium ${remainingPoints < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                Verbleibend: {remainingPoints}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Business (Geschäftssinn)
                  </label>
                  <span className="text-sm font-bold">{skills.business}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={skills.business}
                  onChange={(e) => handleSkillChange('business', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    <Code className="w-4 h-4 inline mr-2" />
                    Technical (Technik)
                  </label>
                  <span className="text-sm font-bold">{skills.technical}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={skills.technical}
                  onChange={(e) => handleSkillChange('technical', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    Marketing (Vertrieb)
                  </label>
                  <span className="text-sm font-bold">{skills.marketing}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={skills.marketing}
                  onChange={(e) => handleSkillChange('marketing', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    <Users className="w-4 h-4 inline mr-2" />
                    Leadership (Führung)
                  </label>
                  <span className="text-sm font-bold">{skills.leadership}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={skills.leadership}
                  onChange={(e) => handleSkillChange('leadership', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Skill-Tipps:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Business:</strong> Beeinflusst Finanzentscheidungen</li>
                <li>• <strong>Technical:</strong> Wichtig für Produktentwicklung</li>
                <li>• <strong>Marketing:</strong> Hilft bei Kundenakquise</li>
                <li>• <strong>Leadership:</strong> Entscheidend für Team-Management</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleStartGame}
            disabled={!canStart || remainingPoints < 0}
            className={`px-8 py-4 rounded-lg font-semibold text-white transition-all ${
              canStart && remainingPoints >= 0
                ? 'bg-green-600 hover:bg-green-700 hover:scale-105 shadow-lg'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Startup gründen
          </button>
          {(!canStart || remainingPoints < 0) && (
            <p className="text-sm text-gray-500 mt-2">
              {remainingPoints < 0 
                ? 'Du hast zu viele Skill-Punkte vergeben' 
                : 'Bitte fülle alle Felder aus'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};