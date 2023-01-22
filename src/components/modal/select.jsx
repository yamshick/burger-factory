import styles from "./modal.module.scss";

export const Select = ({ items, onSelect, value }) => {
  const onSelectChange = (event) => {
    onSelect && onSelect(event.target.value);
  };
  return (
    <select
      onChange={onSelectChange}
      value={value}
      className={styles.inputItem}
    >
      {items.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};
