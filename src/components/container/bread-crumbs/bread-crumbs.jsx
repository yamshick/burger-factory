import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  dropDownItemsMap,
  dropDownSubItemsMap,
} from "../../side-bar/constants";
import { useEffect } from "react";
import { sideBarSlice } from "store/reducers/side-bar-slice";
import ChevronRight from "assets/icons/chevron-right.svg";
import styles from './bread-crumbs.module.scss'

const locationToBreadCrumbsMap = {
  "/": "Рецепты",
  "/price-list": "Прайс-лист",
  "/combo-sets": "Комбо-наборы",
};
export const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const { dropDownActiveItem, dropDownActiveSubItem } = useSelector(
    (state) => state.sideBarReducer
  );
  const { reset } = sideBarSlice.actions;
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname !== "/") {
      dispatch(reset());
    }
  }, [pathname]);

  const first = locationToBreadCrumbsMap[pathname];
  let second = dropDownItemsMap[dropDownActiveItem?.name];
  let third = dropDownSubItemsMap[dropDownActiveSubItem?.name];

  return (
    <>
      <div className={styles.breadCrumbs}>
        {first && !second && !third && `${first}`}
        {first && second && !third && (
          <>
            <span>{first}</span> <span><ChevronRight /></span> <span>{second}</span>
          </>
        )}
        {first && second && third && (
          <>
            <span>{first}</span> <span><ChevronRight /></span> <span>{second}</span> <span><ChevronRight /></span> <span>{third}</span>
          </>
        )}
      </div>
      {third && <h1>{dropDownSubItemsMap[dropDownActiveSubItem?.name]}</h1>}
    </>
  );
};
