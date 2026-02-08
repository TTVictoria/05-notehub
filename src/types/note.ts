export interface Note {
  id: string;
  title: string;
  content: string;
  tag: 'work' | 'personal' | 'idea';
  createdAt: string;
  updatedAt: string;
}

export interface NoteInput {
  title: string;
  content: string;
  tag: 'work' | 'personal' | 'idea';
}
