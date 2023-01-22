import CloseCross from "assets/icons/close-cross.svg";
import styles from "./modal.module.scss";
export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.closeCrossWrapper} onClick={onClose}>
          <CloseCross />
        </div>
        {children}
      </div>
    </div>
  );
};
