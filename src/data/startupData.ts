import { Decision, GameEvent, Milestone } from '../types/Game';

export const startupDecisions: Decision[] = [
  // Ideenphase
  {
    id: 'business-idea',
    title: 'Geschäftsidee definieren',
    description: 'Du hast eine Idee für ein digitales Produkt. Wie gehst du vor?',
    category: 'product',
    stage: 'idea',
    options: [
      {
        id: 'market-research',
        text: 'Gründliche Marktanalyse durchführen',
        cost: 2000,
        timeRequired: 2,
        effects: { 
          cash: -2000, 
          marketValidation: 30,
          stress: 10
        },
        benefits: ['Fundierte Marktkenntnis', 'Reduziertes Risiko'],
        risks: ['Hohe Anfangskosten', 'Zeitverlust']
      },
      {
        id: 'quick-prototype',
        text: 'Schnell einen Prototyp entwickeln',
        cost: 500,
        timeRequired: 1,
        effects: { 
          cash: -500, 
          productDevelopment: 20,
          energy: -15
        },
        benefits: ['Schneller Start', 'Frühe Lerneffekte'],
        risks: ['Unvalidierte Annahmen', 'Mögliche Fehlentscheidungen']
      },
      {
        id: 'lean-approach',
        text: 'Lean Startup Methode anwenden',
        cost: 1000,
        timeRequired: 1,
        effects: { 
          cash: -1000, 
          marketValidation: 15,
          productDevelopment: 15
        },
        benefits: ['Ausgewogener Ansatz', 'Iterative Entwicklung'],
        risks: ['Mittlere Geschwindigkeit']
      }
    ]
  },
  
  // Validierungsphase
  {
    id: 'legal-form',
    title: 'Rechtsform wählen',
    description: 'Dein Startup nimmt Gestalt an. Welche Rechtsform wählst du?',
    category: 'legal',
    stage: 'validation',
    options: [
      {
        id: 'einzelunternehmen',
        text: 'Einzelunternehmen gründen',
        cost: 200,
        timeRequired: 1,
        effects: { 
          cash: -200, 
          monthlyBurn: 50
        },
        benefits: ['Einfache Gründung', 'Geringe Kosten', 'Volle Kontrolle'],
        risks: ['Unbeschränkte Haftung', 'Schwierige Investorensuche']
      },
      {
        id: 'ug',
        text: 'UG (haftungsbeschränkt) gründen',
        cost: 1000,
        timeRequired: 2,
        effects: { 
          cash: -1000, 
          monthlyBurn: 200
        },
        benefits: ['Beschränkte Haftung', 'Professioneller Auftritt'],
        risks: ['Höhere Gründungskosten', 'Mehr Bürokratie']
      },
      {
        id: 'gmbh',
        text: 'GmbH gründen',
        cost: 25000,
        timeRequired: 3,
        requirements: { cash: 25000 },
        effects: { 
          cash: -25000, 
          monthlyBurn: 300,
          brandAwareness: 10
        },
        benefits: ['Hohe Glaubwürdigkeit', 'Investorenfreundlich'],
        risks: ['Hohe Stammkapital-Anforderung', 'Komplexe Verwaltung']
      }
    ]
  },

  // MVP Phase
  {
    id: 'mvp-development',
    title: 'MVP Entwicklung',
    description: 'Zeit für dein Minimum Viable Product. Wie entwickelst du es?',
    category: 'product',
    stage: 'mvp',
    options: [
      {
        id: 'self-develop',
        text: 'Selbst programmieren',
        cost: 2000,
        timeRequired: 4,
        effects: { 
          cash: -2000, 
          productDevelopment: 40,
          energy: -30,
          stress: 20
        },
        benefits: ['Vollständige Kontrolle', 'Tiefes Produktverständnis'],
        risks: ['Hoher Zeitaufwand', 'Mögliche technische Schulden']
      },
      {
        id: 'hire-freelancer',
        text: 'Freelancer beauftragen',
        cost: 8000,
        timeRequired: 2,
        effects: { 
          cash: -8000, 
          productDevelopment: 35,
          stress: 10
        },
        benefits: ['Professionelle Entwicklung', 'Zeitersparnis'],
        risks: ['Hohe Kosten', 'Weniger Kontrolle']
      },
      {
        id: 'no-code',
        text: 'No-Code Plattform nutzen',
        cost: 500,
        timeRequired: 1,
        effects: { 
          cash: -500, 
          productDevelopment: 25,
          monthlyBurn: 100
        },
        benefits: ['Schnelle Umsetzung', 'Geringe Kosten'],
        risks: ['Begrenzte Funktionalität', 'Abhängigkeit von Plattform']
      }
    ]
  },

  // Launch Phase
  {
    id: 'marketing-strategy',
    title: 'Marketing-Strategie',
    description: 'Dein Produkt ist bereit. Wie bringst du es an den Markt?',
    category: 'marketing',
    stage: 'launch',
    options: [
      {
        id: 'social-media',
        text: 'Social Media Marketing',
        cost: 3000,
        timeRequired: 2,
        effects: { 
          cash: -3000, 
          brandAwareness: 25,
          customers: 100,
          monthlyBurn: 500
        },
        benefits: ['Direkte Kundenansprache', 'Viral-Potenzial'],
        risks: ['Unvorhersagbare Reichweite', 'Zeitintensiv']
      },
      {
        id: 'content-marketing',
        text: 'Content Marketing & SEO',
        cost: 2000,
        timeRequired: 3,
        effects: { 
          cash: -2000, 
          brandAwareness: 20,
          customers: 150,
          monthlyRevenue: 200
        },
        benefits: ['Nachhaltige Sichtbarkeit', 'Expertise-Aufbau'],
        risks: ['Langsame Ergebnisse', 'Kontinuierlicher Aufwand']
      },
      {
        id: 'paid-ads',
        text: 'Google & Facebook Ads',
        cost: 5000,
        timeRequired: 1,
        effects: { 
          cash: -5000, 
          brandAwareness: 15,
          customers: 200,
          monthlyBurn: 1000
        },
        benefits: ['Schnelle Ergebnisse', 'Messbare Performance'],
        risks: ['Hohe laufende Kosten', 'Abhängigkeit von Plattformen']
      }
    ]
  },

  // Wachstumsphase
  {
    id: 'first-hire',
    title: 'Erste Anstellung',
    description: 'Du brauchst Unterstützung. Wen stellst du zuerst ein?',
    category: 'hiring',
    stage: 'growth',
    options: [
      {
        id: 'developer',
        text: 'Entwickler einstellen',
        cost: 4000,
        timeRequired: 2,
        effects: { 
          cash: -4000, 
          employees: 1,
          monthlyBurn: 4500,
          productDevelopment: 20
        },
        benefits: ['Schnellere Produktentwicklung', 'Technische Expertise'],
        risks: ['Hohe Personalkosten', 'Führungsverantwortung']
      },
      {
        id: 'marketing-manager',
        text: 'Marketing Manager einstellen',
        cost: 3500,
        timeRequired: 2,
        effects: { 
          cash: -3500, 
          employees: 1,
          monthlyBurn: 4000,
          brandAwareness: 15,
          customers: 50
        },
        benefits: ['Professionelles Marketing', 'Kundenakquise'],
        risks: ['Hohe Personalkosten', 'ROI unsicher']
      },
      {
        id: 'virtual-assistant',
        text: 'Virtuelle Assistenz',
        cost: 1000,
        timeRequired: 1,
        effects: { 
          cash: -1000, 
          monthlyBurn: 800,
          energy: 10,
          stress: -10
        },
        benefits: ['Entlastung bei Admin-Aufgaben', 'Flexible Kosten'],
        risks: ['Begrenzte Fähigkeiten', 'Kommunikationsaufwand']
      }
    ]
  },

  // Finanzierung
  {
    id: 'funding-round',
    title: 'Finanzierungsrunde',
    description: 'Du brauchst mehr Kapital. Welche Finanzierung wählst du?',
    category: 'funding',
    stage: 'growth',
    options: [
      {
        id: 'bootstrapping',
        text: 'Weiter bootstrappen',
        cost: 0,
        timeRequired: 1,
        effects: { 
          stress: 15,
          energy: -10
        },
        benefits: ['Vollständige Kontrolle', 'Keine Verwässerung'],
        risks: ['Begrenztes Wachstum', 'Hoher Stress']
      },
      {
        id: 'business-angel',
        text: 'Business Angel suchen',
        cost: 2000,
        timeRequired: 3,
        effects: { 
          cash: 48000, // 50k - 2k costs
          monthlyBurn: 100,
          brandAwareness: 10
        },
        benefits: ['Kapital + Expertise', 'Netzwerk-Zugang'],
        risks: ['Anteilsverlust', 'Mitspracherecht']
      },
      {
        id: 'bank-loan',
        text: 'Bankkredit beantragen',
        cost: 1000,
        timeRequired: 2,
        effects: { 
          cash: 24000, // 25k - 1k costs
          monthlyBurn: 500
        },
        benefits: ['Keine Anteilsverwässerung', 'Planbare Kosten'],
        risks: ['Persönliche Haftung', 'Zinslast']
      }
    ]
  }
];

export const startupEvents: GameEvent[] = [
  {
    id: 'covid-impact',
    title: 'Corona-Pandemie',
    description: 'Die COVID-19 Pandemie verändert das Geschäftsumfeld drastisch. Digitale Lösungen sind gefragter denn je.',
    type: 'opportunity',
    impact: 'Erhöhte Nachfrage nach digitalen Produkten',
    month: 6,
    autoTrigger: true
  },
  {
    id: 'gdpr-compliance',
    title: 'DSGVO Compliance',
    description: 'Du musst dein Produkt DSGVO-konform gestalten. Das kostet Zeit und Geld.',
    type: 'challenge',
    impact: 'Zusätzliche Entwicklungskosten und rechtliche Anforderungen',
    month: 4,
    stage: 'mvp'
  },
  {
    id: 'competitor-launch',
    title: 'Konkurrent startet',
    description: 'Ein gut finanziertes Startup mit ähnlicher Idee geht an den Start.',
    type: 'challenge',
    impact: 'Erhöhter Wettbewerbsdruck',
    month: 8
  },
  {
    id: 'media-attention',
    title: 'Medienaufmerksamkeit',
    description: 'Ein lokaler Tech-Blog berichtet über dein Startup.',
    type: 'opportunity',
    impact: 'Erhöhte Sichtbarkeit und Glaubwürdigkeit',
    month: 10,
    stage: 'launch'
  },
  {
    id: 'key-customer',
    title: 'Großkunde interessiert',
    description: 'Ein mittelständisches Unternehmen zeigt Interesse an einer Enterprise-Version.',
    type: 'opportunity',
    impact: 'Potenzial für signifikante Umsatzsteigerung',
    month: 12,
    stage: 'growth'
  }
];

export const startupMilestones: Milestone[] = [
  {
    id: 'first-customer',
    title: 'Erster zahlender Kunde',
    description: 'Du hast deinen ersten Kunden gewonnen!',
    requirements: { customers: 1, monthlyRevenue: 50 },
    reward: { brandAwareness: 10 },
    achieved: false
  },
  {
    id: 'break-even',
    title: 'Break-Even erreicht',
    description: 'Deine Einnahmen decken die Ausgaben!',
    requirements: { monthlyRevenue: 5000 },
    reward: { cash: 5000 },
    achieved: false
  },
  {
    id: 'first-employee',
    title: 'Erster Mitarbeiter',
    description: 'Du hast dein Team erweitert!',
    requirements: { employees: 1 },
    reward: { brandAwareness: 15 },
    achieved: false
  },
  {
    id: 'product-market-fit',
    title: 'Product-Market Fit',
    description: 'Dein Produkt trifft den Markt perfekt!',
    requirements: { customers: 100, productDevelopment: 80, marketValidation: 70 },
    reward: { cash: 10000, unlockStage: 'scale' },
    achieved: false
  }
];