import { useState } from 'react';

/**
 * @name useModal
 * @description A hook to manage the state of a modal.
 * @param {boolean} [initialState=false] - The initial open state of the modal.
 * @returns {{ isOpen: boolean, openModal: () => void, closeModal: () => void, toggleModal: () => void }} - An object with the modal state and functions to control it.
 *
 * @example
 * const MyComponent = () => {
 *   const { isOpen, openModal, closeModal } = useModal();
 *
 *   return (
 *     <div>
 *       <button onClick={openModal}>Open Modal</button>
 *       {isOpen && (
 *         <div className="modal">
 *           <h2>Modal Content</h2>
 *           <button onClick={closeModal}>Close</button>
 *         </div>
 *       )}
 *     </div>
 *   );
 * };
 */
const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};

export default useModal;
