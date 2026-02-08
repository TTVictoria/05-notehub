import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        const handleBackdropClick = (e: MouseEvent) => {
            if ((e.target as Element).classList.contains(css.backdrop)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('mousedown', handleBackdropClick);
        document.body.style.overflow = 'hidden';

        return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('mousedown', handleBackdropClick);
        document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className={css.backdrop} role="dialog" aria-modal="true">
            <div className={css.modal}>{children}</div>
        </div>,
        document.body
    );
}

export default Modal;