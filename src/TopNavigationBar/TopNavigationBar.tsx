import { DayPicker } from "react-day-picker";
import { Avatar } from "../Avatar/Avatar";
import { useSearch } from "../SearchContext/SearchContext";
import styles from "./TopNavigationBar.module.css";
import { useState } from "react";
export function TopNavigationBar() {
    const { filters, setFilters } = useSearch()
    const [isModalOpen, setIsModalOpen] = useState<'DueDate' | null>(null)
    const handleFilterDueDateModal = () => {
        setIsModalOpen(isModalOpen === 'DueDate' ? null : 'DueDate')
    }
    return (
        <div className={styles.top_navigation__bar}>
            <img src="/navBarIcons/search.svg" alt="Search" className={styles.search__icon} />
            <input type="text" placeholder="Search..." className={styles.search__input} value={filters.searchTerm} onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))} />
            {(filters.searchTerm === '') ? '' : <img src="/navBarIcons/delete.svg" alt="Delete" className={styles.delete__icon} />}
            <img src="/navBarIcons/notification.svg" alt="Notification" className={styles.notification__icon} />
            <div className={styles.DropdownWrapper}>
                <button
                    className={styles.ModalOptions__Edit}
                    onClick={handleFilterDueDateModal}
                    aria-label='Edit DueDate'
                >
                    <img src='./modalIcons/dueDate.svg' alt='dueDate' aria-hidden='true' />
                    <span>Due date</span>
                </button>
                {(isModalOpen === 'DueDate') &&
                    <>
                        <div className={styles.DropdownBackdrop} onClick={() => setIsModalOpen(null)} />
                        <div className={styles.DropdownMenu}>
                            <div>
                                <DayPicker
                                    mode="single"
                                    selected={filters.dueDate ? new Date(filters.dueDate) : undefined}
                                    onSelect={(date) => {
                                        if (date) { setFilters(prev => ({ ...prev, dueDate: date.toISOString() })) }
                                        if (date) { setIsModalOpen(null) }
                                    }}
                                />
                            </div>
                        </div>
                    </>

                }
            </div>


            <Avatar avatar="" fullName="" size="sm" showName={false} />
        </div>
    );
}