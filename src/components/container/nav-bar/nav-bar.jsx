import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styles from "./hav-bar.module.scss";
import { PageReceipts } from "../page-receipts";
import { BreadCrumbs } from "../bread-crumbs/bread-crumbs";

export const NavBar = () => {
  return (
    <Router>
      <div>
        <nav>
          <div className={styles.navBar}>
            <div className={styles.navBarItem}>
              <Link to="/">Рецепты</Link>
            </div>
            <div className={styles.navBarItem}>
              <Link to="/price-list">Прайс-лист</Link>
            </div>
            <div className={styles.navBarItem}>
              <Link to="/combo-sets">Комбо-наборы</Link>
            </div>
          </div>
        </nav>

        <BreadCrumbs />

        <Routes>
          <Route path="/" element={<PageReceipts />}></Route>
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

function Receipts() {
  return <h2>Рецепты</h2>;
}

function PriceList() {
  return <h2>Прайс-лист</h2>;
}
