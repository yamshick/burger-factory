import RemoveIcon from "assets/icons/close-cross.svg";
import CopyIcon from "assets/icons/copy-icon.svg";
import RemoveSelectionIcon from "assets/icons/remove-selection-icon.svg";

import styles from "./info-panel.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { blocksSlice } from "store/reducers/blocks-slice";
export const InfoPanel = ({}) => {
  const { checkedBlockItems, checkedBlockSubItems } = useSelector(
    (state) => state.blocksReducer
  );
  const { dropDownActiveSubItem } = useSelector(
    (state) => state.sideBarReducer
  );
  const snackId = dropDownActiveSubItem?.id;
  const dispatch = useDispatch();
  const { removeSelectedBlockItems, resetCheckboxes, copySelectedBlockItems } =
    blocksSlice.actions;

  if (!checkedBlockItems.length && !checkedBlockSubItems.length) return null;

  const onRemoveGroups = () => dispatch(removeSelectedBlockItems());
  const onRemoveSelection = () => dispatch(resetCheckboxes());
  const onCopySelectedBlockItems = () =>
    dispatch(copySelectedBlockItems({ snackId }));
  return (
    <div className={styles.infoPanelContainer}>
      <div className={styles.buttonGroup}>
        <button onClick={onRemoveGroups} className={styles.button}>
          <span>
            <RemoveIcon />
          </span>
          <span>Удалить</span>
        </button>
        <button onClick={onCopySelectedBlockItems} className={styles.button}>
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
