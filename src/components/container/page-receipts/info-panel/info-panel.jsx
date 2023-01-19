import RemoveIcon from "./remove-icon.svg";
import CopyIcon from "./copy-icon.svg";
import RemoveSelectionIcon from "./remove-selection-icon.svg";

import styles from "./info-panel.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { blocksSlice } from "../../../../store/reducers/blocks-slice";
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
      <button onClick={onRemoveGroups}>
        <RemoveIcon />
        Удалить
      </button>
      <button onClick={onCopySelectedGroups}>
        <CopyIcon />
        Копировать
      </button>
      <button onClick={onRemoveSelection}>
        <RemoveSelectionIcon />
        Снять выделение
      </button>
      <div>Выбранные ингридиенты</div>
      <div>Общий вес</div>
    </div>
  );
};
