import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./Modal.module.css";
import NoteForm from "../NoteForm/NoteForm";

interface NoteModalProps {
  onClose: () => void;
}

export default function NoteModal({ onClose }: NoteModalProps) {
  const handleBackDropClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <>
      <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={handleBackDropClose}
      >
        <div className={css.modal}>
          <NoteForm cancel={onClose} />
        </div>
      </div>
    </>,
    document.body
  );
}