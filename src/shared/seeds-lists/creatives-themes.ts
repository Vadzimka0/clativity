export type CreativeTheme = {
  id: number;
  theme: string; // seed data from customer
};

export type CreativesThemes = {
  [key: string]: CreativeTheme[];
};

export const CREATIVES_THEMES: CreativesThemes = {
  'Business ideas': [
    {
      id: 1,
      theme: 'Self-service coffee shop',
    },
    {
      id: 2,
      theme: '',
    },
    {
      id: 3,
      theme: '',
    },
  ],
  'Ideas for a gift': [
    {
      id: 4,
      theme: '',
    },
  ],
  'What to do in your free time': [
    {
      id: 5,
      theme: 'test',
    },
  ],
  'An idea for sports': [
    {
      id: 6,
      theme: '',
    },
  ],
  'What to do on vacation': [
    {
      id: 7,
      theme: '',
    },
  ],
};
