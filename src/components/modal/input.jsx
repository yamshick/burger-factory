import styles from "./modal.module.scss";
export const Input = ({ placeholder, type, onChange }) => {
  const onInputChange = (event) => {
    onChange && onChange(event.target.value);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onInputChange}
      className={styles.inputItem}
    />
  );
};
