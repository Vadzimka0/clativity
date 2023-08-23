export type CopywritingStyle = {
  id: number;
  style: string; // seed data from customer
};

export const COPYWRITING_STYLES: CopywritingStyle[] = [
  { id: 1, style: 'artistic' },
  { id: 2, style: 'conversational' },
  { id: 3, style: 'journalistic' },
  { id: 4, style: 'official business' },
  { id: 5, style: 'scientific' },
];
