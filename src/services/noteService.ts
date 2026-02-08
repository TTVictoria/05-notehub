import axios from "axios";
import { type Note, type NoteInput } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface paramsProps {
  page: number;
  perPage: number;
  search?: string;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const headersToken = {
  Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  Accept: "application/json",
};

export async function fetchNotes(
  search: string,
  page: number
): Promise<FetchNotesResponse> {
  const params: paramsProps = {
    page,
    perPage: 12,
  };
  if (search.trim()) {
    params.search = search;
  }
  const res = await axios.get<FetchNotesResponse>(`/notes`, {
    params,
    headers: headersToken,
  });
  return res.data;
}

export async function createNote(noteData: NoteInput): Promise<Note> {
  const res = await axios.post<Note>("/notes", noteData, {
    headers: headersToken,
  });
  return res.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const res = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: headersToken,
  });
  return res.data;
}
