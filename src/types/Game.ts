export interface Founder {
  id: string;
  name: string;
  skills: {
    business: number;
    technical: number;
    marketing: number;
    leadership: number;
  };
  energy: number;
  stress: number;
}

export interface Startup {
  name: string;
  legalForm: 'Einzelunternehmen' | 'GbR' | 'UG' | 'GmbH' | 'AG' | null;
  stage: 'idea' | 'validation' | 'mvp' | 'launch' | 'growth' | 'scale';
  cash: number;
  monthlyBurn: number;
  monthlyRevenue: number;
  customers: number;
  employees: number;
  productDevelopment: number;
  marketValidation: number;
  brandAwareness: number;
  month: number;
  location: string;
  industry: string;
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  category: 'legal' | 'funding' | 'product' | 'marketing' | 'hiring' | 'operations';
  stage: Startup['stage'];
  options: DecisionOption[];
  timeLimit?: number;
  consequences?: string;
}

export interface DecisionOption {
  id: string;
  text: string;
  cost: number;
  timeRequired: number;
  requirements?: {
    cash?: number;
    stage?: Startup['stage'];
    employees?: number;
  };
  effects: {
    cash?: number;
    monthlyBurn?: number;
    monthlyRevenue?: number;
    customers?: number;
    employees?: number;
    productDevelopment?: number;
    marketValidation?: number;
    brandAwareness?: number;
    energy?: number;
    stress?: number;
  };
  risks?: string[];
  benefits?: string[];
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'challenge' | 'crisis' | 'milestone';
  impact: string;
  month: number;
  stage?: Startup['stage'];
  autoTrigger?: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  requirements: {
    cash?: number;
    customers?: number;
    employees?: number;
    monthlyRevenue?: number;
    productDevelopment?: number;
  };
  reward: {
    cash?: number;
    brandAwareness?: number;
    unlockStage?: Startup['stage'];
  };
  achieved: boolean;
}