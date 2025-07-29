import { useState, useCallback } from 'react';
import { Founder, Startup, Decision, GameEvent, Milestone } from '../types/Game';
import { startupDecisions, startupEvents, startupMilestones } from '../data/startupData';

export const useStartupGame = () => {
  const [founder, setFounder] = useState<Founder | null>(null);
  const [startup, setStartup] = useState<Startup | null>(null);
  const [currentDecisions, setCurrentDecisions] = useState<Decision[]>([]);
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>(startupMilestones);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = useCallback((gameFounder: Founder, startupName: string, industry: string) => {
    setFounder(gameFounder);
    setStartup({
      name: startupName,
      legalForm: null,
      stage: 'idea',
      cash: 10000, // Startkapital
      monthlyBurn: 500, // Grundkosten
      monthlyRevenue: 0,
      customers: 0,
      employees: 0,
      productDevelopment: 0,
      marketValidation: 0,
      brandAwareness: 0,
      month: 1,
      location: 'Berlin',
      industry
    });
    
    // Erste Entscheidung laden
    const firstDecision = startupDecisions.find(d => d.stage === 'idea');
    if (firstDecision) {
      setCurrentDecisions([firstDecision]);
    }
    
    setGameStarted(true);
  }, []);

  const makeDecision = useCallback((decisionId: string, optionId: string) => {
    if (!startup || !founder) return;

    const decision = currentDecisions.find(d => d.id === decisionId);
    const option = decision?.options.find(o => o.id === optionId);
    
    if (!decision || !option) return;

    // Anwenden der Effekte
    setStartup(prev => {
      if (!prev) return prev;
      
      const newStartup = { ...prev };
      
      // Finanzielle Effekte
      if (option.effects.cash) newStartup.cash += option.effects.cash;
      if (option.effects.monthlyBurn) newStartup.monthlyBurn += option.effects.monthlyBurn;
      if (option.effects.monthlyRevenue) newStartup.monthlyRevenue += option.effects.monthlyRevenue;
      
      // Geschäftseffekte
      if (option.effects.customers) newStartup.customers += option.effects.customers;
      if (option.effects.employees) newStartup.employees += option.effects.employees;
      if (option.effects.productDevelopment) {
        newStartup.productDevelopment = Math.min(100, newStartup.productDevelopment + option.effects.productDevelopment);
      }
      if (option.effects.marketValidation) {
        newStartup.marketValidation = Math.min(100, newStartup.marketValidation + option.effects.marketValidation);
      }
      if (option.effects.brandAwareness) {
        newStartup.brandAwareness = Math.min(100, newStartup.brandAwareness + option.effects.brandAwareness);
      }

      // Spezielle Effekte für Rechtsform
      if (decisionId === 'legal-form') {
        if (optionId === 'einzelunternehmen') newStartup.legalForm = 'Einzelunternehmen';
        if (optionId === 'ug') newStartup.legalForm = 'UG';
        if (optionId === 'gmbh') newStartup.legalForm = 'GmbH';
      }

      return newStartup;
    });

    // Gründer-Effekte
    setFounder(prev => {
      if (!prev) return prev;
      
      const newFounder = { ...prev };
      if (option.effects.energy) {
        newFounder.energy = Math.max(0, Math.min(100, newFounder.energy + option.effects.energy));
      }
      if (option.effects.stress) {
        newFounder.stress = Math.max(0, Math.min(100, newFounder.stress + option.effects.stress));
      }
      
      return newFounder;
    });

    // Zeit voranschreiten
    setStartup(prev => {
      if (!prev) return prev;
      return { ...prev, month: prev.month + option.timeRequired };
    });

    // Entscheidung entfernen
    setCurrentDecisions(prev => prev.filter(d => d.id !== decisionId));

    // Nächste Entscheidungen laden
    setTimeout(() => {
      loadNextDecisions();
    }, 1000);

  }, [startup, founder, currentDecisions]);

  const loadNextDecisions = useCallback(() => {
    if (!startup) return;

    // Verfügbare Entscheidungen basierend auf Stage finden
    const availableDecisions = startupDecisions.filter(decision => {
      // Stage-basierte Filterung
      if (decision.stage && decision.stage !== startup.stage) {
        // Erlaube nächste Stage-Entscheidungen wenn bestimmte Kriterien erfüllt sind
        const stageOrder: Startup['stage'][] = ['idea', 'validation', 'mvp', 'launch', 'growth', 'scale'];
        const currentStageIndex = stageOrder.indexOf(startup.stage);
        const decisionStageIndex = stageOrder.indexOf(decision.stage);
        
        if (decisionStageIndex !== currentStageIndex + 1) return false;
        
        // Prüfe ob Stage-Wechsel möglich ist
        if (decision.stage === 'validation' && startup.marketValidation < 20) return false;
        if (decision.stage === 'mvp' && startup.productDevelopment < 30) return false;
        if (decision.stage === 'launch' && startup.productDevelopment < 60) return false;
        if (decision.stage === 'growth' && startup.customers < 10) return false;
      }
      
      // Bereits getroffene Entscheidungen ausschließen
      return !currentDecisions.some(d => d.id === decision.id);
    });

    // Eine zufällige verfügbare Entscheidung auswählen
    if (availableDecisions.length > 0) {
      const randomDecision = availableDecisions[Math.floor(Math.random() * availableDecisions.length)];
      setCurrentDecisions(prev => [...prev, randomDecision]);
      
      // Stage aktualisieren wenn nötig
      if (randomDecision.stage !== startup.stage) {
        setStartup(prev => prev ? { ...prev, stage: randomDecision.stage } : prev);
      }
    }
  }, [startup, currentDecisions]);

  const nextMonth = useCallback(() => {
    if (!startup || !founder) return;

    // Monatliche Kosten abziehen
    setStartup(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        cash: prev.cash - prev.monthlyBurn + prev.monthlyRevenue,
        month: prev.month + 1
      };
    });

    // Energie und Stress anpassen
    setFounder(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        energy: Math.min(100, prev.energy + 5), // Leichte Erholung
        stress: Math.max(0, prev.stress - 2) // Stress reduziert sich langsam
      };
    });

    // Events prüfen
    const monthEvents = startupEvents.filter(event => 
      event.month === startup.month + 1 && 
      (!event.stage || event.stage === startup.stage)
    );
    
    if (monthEvents.length > 0) {
      setEvents(prev => [...prev, ...monthEvents]);
    }

    // Meilensteine prüfen
    setMilestones(prev => prev.map(milestone => {
      if (milestone.achieved) return milestone;
      
      const meetsRequirements = Object.entries(milestone.requirements).every(([key, value]) => {
        return (startup as any)[key] >= value;
      });
      
      if (meetsRequirements) {
        // Belohnung anwenden
        if (milestone.reward.cash) {
          setStartup(s => s ? { ...s, cash: s.cash + milestone.reward.cash! } : s);
        }
        if (milestone.reward.brandAwareness) {
          setStartup(s => s ? { 
            ...s, 
            brandAwareness: Math.min(100, s.brandAwareness + milestone.reward.brandAwareness!) 
          } : s);
        }
        
        return { ...milestone, achieved: true };
      }
      
      return milestone;
    }));

    // Neue Entscheidungen laden wenn keine vorhanden
    if (currentDecisions.length === 0) {
      loadNextDecisions();
    }
  }, [startup, founder, currentDecisions, loadNextDecisions]);

  const dismissEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  }, []);

  const canAffordDecision = (decision: Decision) => {
    if (!startup) return false;
    return decision.options.some(option => startup.cash >= option.cost);
  };

  return {
    founder,
    startup,
    currentDecisions,
    events,
    milestones: milestones.filter(m => m.achieved),
    gameStarted,
    startGame,
    makeDecision,
    nextMonth,
    dismissEvent,
    canAffordDecision
  };
};