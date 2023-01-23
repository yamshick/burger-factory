import RemoveIcon from "assets/icons/close-cross.svg";
import CopyIcon from "assets/icons/copy-icon.svg";
import RemoveSelectionIcon from "assets/icons/remove-selection-icon.svg";

import styles from "./info-panel.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { blocksSlice } from "store/reducers/blocks-slice";
export const InfoPanel = ({}) => {
  const { selectedGroupIds } = useSelector((state) => state.blocksReducer);
  const dispatch = useDispatch();
  const { removeSelectedGroups, resetGroupSelection, copySelectedGroups } =
    blocksSlice.actions;
  const selectedGroupsBlockId = Object.keys(selectedGroupIds)[0];

  if (!selectedGroupsBlockId) return null;

  const onRemoveGroups = () => dispatch(removeSelectedGroups());
  const onRemoveSelection = () => dispatch(resetGroupSelection());
  const onCopySelectedGroups = () => dispatch(copySelectedGroups());
  return (
    <div className={styles.infoPanelContainer}>
      <div className={styles.buttonGroup}>
        <button onClick={onRemoveGroups} className={styles.button}>
          <span>
            <RemoveIcon />
          </span>
          <span>Удалить</span>
        </button>
        <button onClick={onCopySelectedGroups} className={styles.button}>
          <span>
            <CopyIcon />
          </span>
          <span>Копировать</span>
        </button>
        <button onClick={onRemoveSelection} className={styles.button}>
          <span>
            <RemoveSelectionIcon />
          </span>
          <span>Снять выделение</span>
        </button>
      </div>
      <div className={styles.infoContent}>
        <div>Выбранные ингридиенты</div>
        <div className={styles.divider}> </div>
        <div>Общий вес</div>
      </div>
    </div>
  );
};