import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  dropDownItemsMap,
  dropDownSubItemsMap,
} from "../../side-bar/constants";
import { useEffect } from "react";
import { sideBarSlice } from "../../../store/reducers/side-bar-slice";

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
  let second = dropDownItemsMap[dropDownActiveItem];
  let third = dropDownSubItemsMap[dropDownActiveSubItem];

  second = second ? ` / ${second}` : "";
  third = third ? ` / ${third}` : "";

  return (
    <>
      <div>{`${first}${second}${third}`}</div>
      {third && <h1>{dropDownSubItemsMap[dropDownActiveSubItem]}</h1>}
    </>
  );
};
