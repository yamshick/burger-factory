import { useDispatch, useSelector } from "react-redux";
import { modalSlice } from "store/reducers/modal-slice";
import styles from "./modal.module.scss";
export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.closeCrossWrapper} onClick={onClose}>
          x
        </div>
        {children}
      </div>
    </div>
  );
};
