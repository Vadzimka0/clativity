export type VerseStyle = {
  id: number;
  style: string; // seed data from customer
};

export const VERSES_STYLES: VerseStyle[] = [
  { id: 1, style: 'haiku' },
  { id: 2, style: 'fable' },
  { id: 3, style: 'ballad' },
  { id: 4, style: 'story' },
  { id: 5, style: 'legend' },
  { id: 6, style: 'prose' },
  { id: 7, style: 'sonnet' },
];
