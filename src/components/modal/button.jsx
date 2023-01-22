import styles from "./modal.module.scss";

export const Button = ({ onClick, children, ...rest }) => {
  return (
    <button className={styles.addButton} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
