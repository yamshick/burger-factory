import Plus from "../../../../assets/icons/white-plus.svg";
import styles from "./new-block-button.module.scss";
export const NewBlockButton = ({ onClick }) => (
  <button onClick={onClick} className={styles.newBlockButton}>
    <Plus />
    Новый блок
  </button>
);
