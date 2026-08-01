import { Avatar } from "../Avatar/Avatar";
import styles from "./TopNavigationBar.module.css";
export function TopNavigationBar() {
    return (
        <div className={styles.top_navigation__bar}>
            <img src="/navBarIcons/search.svg" alt="Search" className={styles.search__icon} />
            <input type="text" placeholder="Search..." className={styles.search__input} />
            <img src="/navBarIcons/notification.svg" alt="Notification" className={styles.notification__icon} />
            <Avatar avatar="" fullName="" size="sm" showName={false} />
        </div>
    );
}