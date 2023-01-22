import Plus from "../../../../assets/icons/white-plus.svg";
import styles from "./new-block-button.module.scss";
export const NewBlockButton = ({ onClick }) => (
  <button onClick={onClick} className={styles.newBlockButton}>
      <span><Plus /></span>
    <span>Новый блок</span>
  </button>
);
