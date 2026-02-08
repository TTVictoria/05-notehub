import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

export interface ModalProps {
    onClose: () => void;
    children?: ReactNode; // children делаем необязательным
}

function Modal({ onClose, children }: ModalProps) {
    useEffect(() => {
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
    }, [onClose]);

    return createPortal(
        <div className={css.backdrop} role="dialog" aria-modal="true">
            <div className={css.modal}>
                {children}
            </div>
        </div>,
        document.body
    );
}

export default Modal;
