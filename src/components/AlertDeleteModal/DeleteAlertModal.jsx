import * as React from "react";
import { useEffect } from "react";
import Modal from "react-modal";

import "./styles.css";

const DeleteAlertModal = ({ isOpen, onClose, onHandleDelete }) => {
  useEffect(() => {
    const delModal = document.querySelector("body");
    if (isOpen) {
      delModal.classList.add("cnDeleteAlertModalOverflow");
    } else {
      delModal.classList.remove("cnDeleteAlertModalOverflow");
    }
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="cnDeleteAlertModal"
      overlayClassName="cnDeleteAlertModalOverlay"
      ariaHideApp={false}
    >
      <div className="cnDeleteAlertModalRoot">
        <div className="cnDeleteAlertModalContent">
          <div className="cnDeleteModalText">
            <span>Вы действительно хотите удалить пост?</span>
          </div>
          <div className="cnModalDeleteButtons">
            <button className="cnModalDeleteBtnOk" onClick={onHandleDelete}>
              Ок
            </button>
            <button className="cnModalDeleteBtnCancel" onClick={onClose}>
              Отмена
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAlertModal;
