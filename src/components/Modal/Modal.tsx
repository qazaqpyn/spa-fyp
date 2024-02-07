import React, { FC, ReactElement } from 'react';
import './Modal.css';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children?: ReactElement;
}

export function Modal({ open, onClose, children }: ModalProps): ReturnType<FC> {
    return (
        <div className={`${'modal'} ${open ? 'display-block' : 'display-none'}`}>
            <div className="modal-main">
                <div className="modal-body">{children}</div>
                <div className="btn-container">
                    <button type="button" className="btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
