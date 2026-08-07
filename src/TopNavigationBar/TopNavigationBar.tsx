import { Avatar } from "../Avatar/Avatar";
import { useSearch } from "../SearchContext/SearchContext";
import styles from "./TopNavigationBar.module.css";
export function TopNavigationBar() {
    const { searchTerm, setSearchTerm } = useSearch()
    return (
        <div className={styles.top_navigation__bar}>
            <img src="/navBarIcons/search.svg" alt="Search" className={styles.search__icon} />
            <input type="text" placeholder="Search..." className={styles.search__input} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <img src="/navBarIcons/notification.svg" alt="Notification" className={styles.notification__icon} />
            <Avatar avatar="" fullName="" size="sm" showName={false} />
        </div>
    );
}