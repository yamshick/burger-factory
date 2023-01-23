import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import styles from "./hav-bar.module.scss";
import { Receipts } from "components/container/page-receipts/receipts";
import { BreadCrumbs } from "../bread-crumbs/bread-crumbs";

export const NavBar = () => {
  return (
    <Router>
      <div>
        <nav>
          <div className={styles.navBar}>
            {[
              { name: "Рецепты", link: "/" },
              { name: "Прайс-лист", link: "/price-list" },
              { name: "Комбо-наборы", link: "/combo-sets" },
            ].map(({ name, link }, idx) => (
              <div key={idx}>
                <div className={styles.navBarItem}>
                  <NavLink
                    className={styles.link}
                    // activeStyle={{ color: "red" }}
                    to={link}
                  >
                    {name}
                  </NavLink>
                </div>
              </div>
            ))}
            {/*<div className={styles.navBarItem}>*/}
            {/*  <NavLink className={styles.link} activeStyle={{ color: 'red' }} to="/">Рецепты</NavLink>*/}
            {/*</div>*/}
            {/*<div className={styles.navBarItem}>*/}
            {/*  <NavLink className={styles.link} to="/price-list">Прайс-лист</NavLink>*/}
            {/*</div>*/}
            {/*<div className={styles.navBarItem}>*/}
            {/*  <NavLink className={styles.link} to="/combo-sets">Комбо-наборы</NavLink>*/}
            {/*</div>*/}
          </div>
        </nav>

        <BreadCrumbs />

        <Routes>
          <Route path="/" element={<Receipts />}></Route>
          <Route path="/price-list" element={<PriceList />}></Route>
          <Route path="/combo-sets" element={<ComboSets />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

function ComboSets() {
  return <h2>Комбо-наборы</h2>;
}

function PriceList() {
  return <h2>Прайс-лист</h2>;
}
