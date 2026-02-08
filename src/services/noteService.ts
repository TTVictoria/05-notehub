import axios from "axios";
import { Note, NoteInput } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  perPage: number,
  search?: string
): Promise<FetchNotesResponse> {
  const params: {
    page: number;
    perPage: number;
    search?: string;
  } = {
    page,
    perPage,
  };

  if (search?.trim()) {
    params.search = search;
  }

  const response = await axios.get<FetchNotesResponse>("/notes", {
    params,
    headers,
  });

  return response.data;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await axios.post<Note>("/notes", note, {
    headers,
  });
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers,
  });
  return response.data;
}
