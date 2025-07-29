import React from 'react';
import { FounderSetup } from './components/FounderSetup';
import { StartupDashboard } from './components/StartupDashboard';
import { DecisionCard } from './components/DecisionCard';
import { EventCard } from './components/EventCard';
import { MilestoneCard } from './components/MilestoneCard';
import { useStartupGame } from './hooks/useStartupGame';
import { ArrowRight, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';

function App() {
  const {
    founder,
    startup,
    currentDecisions,
    events,
    milestones,
    gameStarted,
    startGame,
    makeDecision,
    nextMonth,
    dismissEvent,
    canAffordDecision
  } = useStartupGame();

  if (!gameStarted || !founder || !startup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <FounderSetup onStartGame={startGame} />
      </div>
    );
  }

  const isLowCash = startup.cash < startup.monthlyBurn * 2;
  const isHighStress = founder.stress > 80;
  const isLowEnergy = founder.energy < 20;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Dashboard */}
        <StartupDashboard startup={startup} founder={founder} />

        {/* Kritische Warnungen */}
        {(isLowCash || isHighStress || isLowEnergy) && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              <h3 className="font-semibold text-red-800">Kritische Situation!</h3>
            </div>
            <div className="space-y-1 text-sm text-red-700">
              {isLowCash && <p>• Liquidität kritisch - Finanzierung dringend erforderlich</p>}
              {isHighStress && <p>• Stress-Level zu hoch - Pause oder Delegation nötig</p>}
              {isLowEnergy && <p>• Energie sehr niedrig - Erholung erforderlich</p>}
            </div>
          </div>
        )}

        {/* Meilensteine */}
        {milestones.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Erreichte Meilensteine
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {milestones.map(milestone => (
                <MilestoneCard key={milestone.id} milestone={milestone} />
              ))}
            </div>
          </div>
        )}

        {/* Events */}
        {events.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            onDismiss={() => dismissEvent(event.id)} 
          />
        ))}

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Entscheidungen */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Anstehende Entscheidungen</h2>
              {currentDecisions.length === 0 && (
                <button
                  onClick={nextMonth}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Nächster Monat</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {currentDecisions.length > 0 ? (
              <div className="space-y-6">
                {currentDecisions.map(decision => (
                  <DecisionCard 
                    key={decision.id}
                    decision={decision}
                    founder={founder}
                    canAfford={canAffordDecision(decision)}
                    onVote={makeDecision}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <Calendar className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Keine anstehenden Entscheidungen
                </h3>
                <p className="text-gray-600 mb-6">
                  Du hast alle wichtigen Entscheidungen getroffen. 
                  Zeit vergeht und dein Startup entwickelt sich weiter.
                </p>
                <button
                  onClick={nextMonth}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Zeit voranschreiten
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Startup Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Startup-Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Phase</span>
                  <span className="font-semibold capitalize">{startup.stage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Runway</span>
                  <span className={`font-semibold ${isLowCash ? 'text-red-600' : 'text-green-600'}`}>
                    {startup.monthlyBurn > 0 ? Math.floor(startup.cash / startup.monthlyBurn) : '∞'} Monate
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Erfolg</span>
                  <span className="font-semibold">
                    {Math.round((startup.productDevelopment + startup.marketValidation + startup.brandAwareness) / 3)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(100, (startup.productDevelopment + startup.marketValidation + startup.brandAwareness) / 3)}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Gründer Skills */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Deine Fähigkeiten</h3>
              <div className="space-y-3">
                {Object.entries(founder.skills).map(([skill, value]) => (
                  <div key={skill}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600 capitalize">{skill}</span>
                      <span className="text-sm font-semibold">{value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-indigo-600 h-1.5 rounded-full"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spieltipps */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Startup-Tipps</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Achte auf deine Liquidität - ohne Geld ist das Spiel vorbei</p>
                <p>• Validiere deine Idee früh am Markt</p>
                <p>• Investiere in Produktentwicklung für langfristigen Erfolg</p>
                <p>• Manage deinen Stress und deine Energie</p>
                <p>• Wähle die richtige Rechtsform für deine Ziele</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;