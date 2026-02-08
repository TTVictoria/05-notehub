import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";

import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchBox from "../SearchBox/SearchBox";

function App() {
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, isFetching, isSuccess } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, perPage, search),
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setSearch(event.target.value);
    },
    500
  );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} onChange={handleSearch} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {(isLoading || isFetching) && <Loader />}
      {isError && <ErrorMessage />}

      {isSuccess && data.notes.length > 0 && (
        <>
          <NoteList notes={data.notes} />
          {data.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
