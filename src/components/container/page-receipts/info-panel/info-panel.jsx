import RemoveIcon from "./remove-icon.svg";
import CopyIcon from "./copy-icon.svg";
import RemoveSelectionIcon from "./remove-selection-icon.svg";

import styles from "./info-panel.module.scss";
import { useSelector } from "react-redux";
export const InfoPanel = ({}) => {
  const { selectedGroupIds } = useSelector((state) => state.blocksReducer);
  console.log(JSON.stringify(selectedGroupIds));
  const selectedGroupsBlock = Object.keys(selectedGroupIds)[0];

  if (!selectedGroupsBlock) return null;

  return (
    <div className={styles.infoPanelContainer}>
      <button>
        <RemoveIcon />
        Удалить
      </button>
      <button>
        <CopyIcon />
        Копировать
      </button>
      <button>
        <RemoveSelectionIcon />
        Снять выделение
      </button>
      <div>Выбранные ингридиенты</div>
      <div>Общий вес</div>
    </div>
  );
};
