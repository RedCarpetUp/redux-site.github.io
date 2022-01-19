import { ModalContainer } from "./complaint.style";


const Modal = ({ isOpen, handleClose, children }) => {

    const closeModal = e => {
        e.stopPropagation();
        handleClose();
    }

    return isOpen && (
        <ModalContainer onClick={handleClose}>
            <div onClick={e => e.stopPropagation()} className="modal-content">
                <span dangerouslySetInnerHTML={{ __html: "&#10006" }} onClick={closeModal} className="modal-close-button"></span>
                {children}
            </div>
        </ModalContainer>
    );
}

export default Modal;