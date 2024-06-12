// Modal.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <button onClick={onClose} className="absolute top-2 right-2 text-black hover:text-gray-700">
        <FaTimes className= "text-red-500" size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
