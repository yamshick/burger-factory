import styles from "../side-bar.module.scss";
import { useDispatch } from "react-redux";

export const DropdownItem = ({
  id,
  name,
  translation,
  onSelectDropdownItem,
}) => {
  return (
    <li
      className={styles.dropDownItem}
      onClick={() => onSelectDropdownItem({ id, name, translation })}
    >
      {translation}
    </li>
  );
};
