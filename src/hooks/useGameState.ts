import { useState, useCallback } from 'react';
import { Player, Company, Decision, GameEvent } from '../types/Game';
import { initialDecisions, gameEvents } from '../data/gameData';

export const useGameState = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [company, setCompany] = useState<Company>({
    name: 'InnovateTech GmbH',
    budget: 50000,
    revenue: 2000,
    employees: 3,
    marketShare: 2,
    productQuality: 40,
    brandRecognition: 15,
    round: 1
  });
  const [decisions, setDecisions] = useState<Decision[]>(initialDecisions);
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = useCallback((gamePlayers: Player[]) => {
    setPlayers(gamePlayers);
    setGameStarted(true);
  }, []);

  const vote = useCallback((decisionId: string, optionId: string) => {
    setDecisions(prev => prev.map(decision => {
      if (decision.id !== decisionId) return decision;

      const currentPlayer = players.find(p => p.isActive);
      if (!currentPlayer) return decision;

      const newVotes = { ...decision.currentVotes, [currentPlayer.id]: optionId };
      const voteCount = Object.keys(newVotes).length;
      const isResolved = voteCount >= decision.requiredVotes;

      if (isResolved) {
        // Apply effects of the most voted option
        const voteCounts = decision.options.map(option => ({
          option,
          votes: Object.values(newVotes).filter(vote => vote === option.id).length
        }));
        
        const winningOption = voteCounts.reduce((max, current) => 
          current.votes > max.votes ? current : max
        ).option;

        setCompany(prev => {
          const newCompany = { ...prev };
          Object.entries(winningOption.effects).forEach(([key, value]) => {
            if (key in newCompany && value !== undefined) {
              (newCompany as any)[key] = Math.max(0, (newCompany as any)[key] + value);
            }
          });
          return newCompany;
        });

        // Move to next player
        setPlayers(prev => {
          const currentIndex = prev.findIndex(p => p.isActive);
          const nextIndex = (currentIndex + 1) % prev.length;
          return prev.map((player, index) => ({
            ...player,
            isActive: index === nextIndex
          }));
        });
      }

      return {
        ...decision,
        currentVotes: newVotes,
        isResolved
      };
    }));
  }, [players]);

  const nextRound = useCallback(() => {
    const newRound = company.round + 1;
    setCompany(prev => ({ ...prev, round: newRound }));
    
    // Add monthly revenue to budget
    setCompany(prev => ({ ...prev, budget: prev.budget + prev.revenue }));
    
    // Check for events
    const roundEvents = gameEvents.filter(event => event.round === newRound);
    setEvents(prev => [...prev, ...roundEvents]);
    
    // Reset decisions
    setDecisions(initialDecisions.map(decision => ({
      ...decision,
      currentVotes: {},
      isResolved: false
    })));
  }, [company.round]);

  const dismissEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  }, []);

  const currentPlayer = players.find(p => p.isActive);
  const activeDecisions = decisions.filter(d => !d.isResolved);
  const resolvedDecisions = decisions.filter(d => d.isResolved);

  return {
    players,
    company,
    decisions: activeDecisions,
    resolvedDecisions,
    events,
    gameStarted,
    currentPlayer,
    startGame,
    vote,
    nextRound,
    dismissEvent
  };
};