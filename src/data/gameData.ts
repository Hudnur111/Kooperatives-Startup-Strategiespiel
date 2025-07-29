import { Decision, GameEvent } from '../types/Game';

export const initialDecisions: Decision[] = [
  {
    id: 'product-launch',
    title: 'Produktlaunch-Strategie',
    description: 'Wie sollen wir unser erstes Produkt auf den Markt bringen?',
    category: 'marketing',
    requiredVotes: 2,
    currentVotes: {},
    isResolved: false,
    options: [
      {
        id: 'soft-launch',
        text: 'Soft Launch mit Beta-Testern',
        cost: 5000,
        effects: { budget: -5000, productQuality: 15, brandRecognition: 5 }
      },
      {
        id: 'big-launch',
        text: 'Große Marketing-Kampagne',
        cost: 15000,
        effects: { budget: -15000, marketShare: 20, brandRecognition: 25 }
      },
      {
        id: 'stealth-launch',
        text: 'Stealth Mode - Word of Mouth',
        cost: 1000,
        effects: { budget: -1000, productQuality: 10, marketShare: 5 }
      }
    ]
  },
  {
    id: 'team-expansion',
    title: 'Team-Erweiterung',
    description: 'Welche Rolle sollten wir als nächstes einstellen?',
    category: 'management',
    requiredVotes: 2,
    currentVotes: {},
    isResolved: false,
    options: [
      {
        id: 'developer',
        text: 'Senior Developer einstellen',
        cost: 8000,
        effects: { budget: -8000, employees: 1, productQuality: 20 }
      },
      {
        id: 'marketer',
        text: 'Marketing Specialist einstellen',
        cost: 6000,
        effects: { budget: -6000, employees: 1, brandRecognition: 15, marketShare: 10 }
      },
      {
        id: 'operations',
        text: 'Operations Manager einstellen',
        cost: 7000,
        effects: { budget: -7000, employees: 1, revenue: 500 }
      }
    ]
  },
  {
    id: 'tech-stack',
    title: 'Technologie-Entscheidung',
    description: 'Welche Technologie sollen wir für die Skalierung verwenden?',
    category: 'development',
    requiredVotes: 2,
    currentVotes: {},
    isResolved: false,
    options: [
      {
        id: 'cloud-native',
        text: 'Cloud-Native Architektur',
        cost: 10000,
        effects: { budget: -10000, productQuality: 25, revenue: 200 }
      },
      {
        id: 'hybrid',
        text: 'Hybrid-Lösung',
        cost: 6000,
        effects: { budget: -6000, productQuality: 15, revenue: 100 }
      },
      {
        id: 'traditional',
        text: 'Traditionelle Server-Infrastruktur',
        cost: 3000,
        effects: { budget: -3000, productQuality: 5, revenue: 50 }
      }
    ]
  }
];

export const gameEvents: GameEvent[] = [
  {
    id: 'investor-interest',
    title: 'Investor-Interesse',
    description: 'Ein Venture Capital Fonds hat Interesse an eurem Startup gezeigt und möchte ein Meeting arrangieren.',
    type: 'opportunity',
    impact: 'Potenzielle Finanzierung von €500.000',
    round: 3
  },
  {
    id: 'competitor-launch',
    title: 'Konkurrent startet',
    description: 'Ein gut finanzierter Konkurrent hat ein ähnliches Produkt gelauncht.',
    type: 'challenge',
    impact: 'Marktanteil könnte sinken',
    round: 4
  },
  {
    id: 'key-employee-leaves',
    title: 'Schlüsselkraft verlässt Unternehmen',
    description: 'Euer Lead Developer hat gekündigt und wechselt zur Konkurrenz.',
    type: 'crisis',
    impact: 'Produktqualität und Entwicklungsgeschwindigkeit leiden',
    round: 5
  }
];