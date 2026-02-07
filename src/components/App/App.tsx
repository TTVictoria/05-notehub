import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import NoteModal from "../Modal/Modal";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isSuccess, error, isError } = useQuery({
    queryKey: ["note", debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError && error) {
      toast.error(`Something went wrong.. try again later`, {
        id: "fetch-error",
      });
    }
  }, [isError, error]);

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  const totalPages = data?.totalPages ?? 0;

  const openForm = () => {
    setIsModalOpen(true);
  };

  const closeForm = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={handleSearch} value={search} />
          {isSuccess && data.notes.length === 0 && (
            <>
              <span> No Match found</span>
            </>
          )}
          {isSuccess && totalPages > 1 && (
            <Pagination totalPages={totalPages} page={page} onPage={setPage} />
          )}

          <button className={css.button} onClick={openForm}>
            Create note +
          </button>
        </header>
        {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      </div>
      {isModalOpen && <NoteModal onClose={closeForm} />}
      {<Toaster />}
    </>
  );
}