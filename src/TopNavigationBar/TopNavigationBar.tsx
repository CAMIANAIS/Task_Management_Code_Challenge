import { useState, useEffect } from "react";
import { Avatar } from "../Avatar/Avatar";
import { useSearch } from "../SearchContext/SearchContext";
import styles from "./TopNavigationBar.module.css";
import { useQueryProfile } from "../CustomHooks/useUsers";
export function TopNavigationBar() {
    const [inputValue, setInputValue] = useState('');
    const { filters, setFilters } = useSearch()
    const { data: profile } = useQueryProfile()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFilters(prev => ({ ...prev, searchTerm: inputValue }));
        }, 300);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [inputValue, setFilters]);

    return (
        <div className={styles.top_navigation__bar}>
            <div className={styles.search__container}>
                <img src="/navBarIcons/search.svg" alt="Search" className={styles.search__icon} />
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles.search__input}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                {(filters.searchTerm !== '') && <img src="/navBarIcons/delete.svg" alt="Delete" onClick={() => setFilters(prev => ({ ...prev, searchTerm: '' }))} className={styles.delete__icon} />}

                <img src="/navBarIcons/notification.svg" alt="Notification" className={styles.notification__icon} />




                <Avatar avatar={profile?.avatar ?? ''} fullName={profile?.fullName ?? ''} size="sm" showName={false} />
            </div>
        </div>
    );
}