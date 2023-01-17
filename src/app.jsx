import styles from "./app.module.scss"
import {SideBar} from "./components/side-bar";
export const App = () => {
    return (<div>
        <h1 className={styles.app}>hello world</h1>
        <SideBar />
    </div>)
}
