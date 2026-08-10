import { DayPicker } from "react-day-picker";
import { Avatar } from "../Avatar/Avatar";
import { useSearch } from "../SearchContext/SearchContext";
import styles from "./TaskFilters.module.css";
import { useState } from "react";
import { useQueryUsers } from "../CustomHooks/useUsers";
import type { User } from "../User/User";
import type { TaskTag } from "../Tag/Tag";
import type { PointEstimate } from "../Card/Card";
export function TaskFilters() {
    const { filters, setFilters } = useSearch()
    const [isModalOpen, setIsModalOpen] = useState<'Estimate' | 'AssigneeId' | 'Tags' | 'DueDate' | null>(null)
    const ALL_TAGS: TaskTag[] = ['ANDROID', 'IOS', 'NODE_JS', 'RAILS', 'REACT']
    const { data: users, isLoading, error } = useQueryUsers()

    // Estimate filter
    const EstimateFilter = (
        <div className={styles.DropdownWrapper}>
            <button
                className={styles.ModalOptions__Filter}
                onClick={() => setIsModalOpen(isModalOpen === 'Estimate' ? null : 'Estimate')}
                aria-label="Filter by estimate"
            >
                <img src='./modalIcons/estimate.svg' alt='estimate' aria-hidden='true' />
                {filters.pointEstimate && <span className={styles.FilterBadge}>1</span>}
            </button>

            {isModalOpen === 'Estimate' && (
                <>
                    <div className={styles.DropdownBackdrop} onClick={() => setIsModalOpen(null)} />
                    <div className={styles.DropdownMenu}>
                        <div>
                            <span>Estimate</span>
                            {(['ZERO', 'ONE', 'TWO', 'FOUR', 'EIGHT'] as PointEstimate[]).map((value) => (
                                <button
                                    key={value}
                                    className={styles.DropdownItem}
                                    onClick={() => {
                                        setFilters(prev => ({
                                            ...prev,
                                            pointEstimate: prev.pointEstimate === value ? undefined : value
                                        }))
                                        setIsModalOpen(null)
                                    }}
                                    aria-pressed={filters.pointEstimate === value}
                                >
                                    <img src='./modalIcons/estimate.svg' alt='' aria-hidden='true' />
                                    <span>{value}</span>
                                </button>
                            ))}
                            {filters.pointEstimate && (
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, pointEstimate: undefined }))}
                                    className={styles.ClearFilter}
                                    style={{ borderTop: '1px solid var(--border-color)' }}
                                >
                                    Clear estimate
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )

    // Owner filter
    const AssigneeFilter = (
        <div className={styles.DropdownWrapper}>
            <button
                className={styles.ModalOptions__Filter}
                onClick={() => setIsModalOpen(isModalOpen === 'AssigneeId' ? null : 'AssigneeId')}
                aria-label="Filter by owner"
            >
                <img src='./modalIcons/assignee.svg' alt='owner' aria-hidden='true' />
                {filters.assigneeId && <span className={styles.FilterBadge}>1</span>}
            </button>

            {isModalOpen === 'AssigneeId' && (
                <>
                    <div className={styles.DropdownBackdrop} onClick={() => setIsModalOpen(null)} />
                    <div className={styles.DropdownMenu}>
                        <div>
                            <span>Owner</span>
                            {isLoading ? (
                                <p style={{ padding: '8px', color: 'var(--text-muted)' }}>Loading...</p>
                            ) : error ? (
                                <p style={{ padding: '8px', color: 'var(--text-error)' }}>Error loading users</p>
                            ) : !users?.length ? (
                                <p style={{ padding: '8px', color: 'var(--text-muted)' }}>No users available</p>
                            ) : (
                                users.map((user: User) => (
                                    <button
                                        key={user.id}
                                        className={styles.DropdownItem}
                                        onClick={() => {
                                            setFilters(prev => ({
                                                ...prev,
                                                assigneeId: prev.assigneeId === user.id ? undefined : user.id
                                            }))
                                            setIsModalOpen(null)
                                        }}
                                        aria-pressed={filters.assigneeId === user.id}
                                    >
                                        <Avatar
                                            fullName={user.fullName}
                                            size="sm"
                                            avatar={user.avatar ?? ''}
                                            showName={true}
                                        />
                                    </button>
                                ))
                            )}
                            {filters.assigneeId && (
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, assigneeId: undefined }))}
                                    className={styles.ClearFilter}
                                    style={{ borderTop: '1px solid var(--border-color)' }}
                                >
                                    Clear owner
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )

    // Tags filter (multi-select)
    const TagsFilter = (
        <div className={styles.DropdownWrapper}>
            <button
                className={styles.ModalOptions__Filter}
                onClick={() => setIsModalOpen(isModalOpen === 'Tags' ? null : 'Tags')}
                aria-label="Filter by tags"
            >
                <img src='./modalIcons/tag.svg' alt='tags' aria-hidden='true' />
                {(filters.tags?.length ?? 0) > 0 && (
                    <span className={styles.FilterBadge}>{filters.tags?.length}</span>
                )}
            </button>

            {isModalOpen === 'Tags' && (
                <>
                    <div className={styles.DropdownBackdrop} onClick={() => setIsModalOpen(null)} />
                    <div className={styles.DropdownMenu}>
                        <div>
                            <span>Tags (any match)</span>
                            {ALL_TAGS.map((tag) => (
                                <button
                                    key={tag}
                                    className={styles.DropdownItem}
                                    onClick={() => {
                                        setFilters(prev => ({
                                            ...prev,
                                            tags: prev.tags?.includes(tag)
                                                ? prev.tags.filter(t => t !== tag)
                                                : [...(prev.tags || []), tag]
                                        }))
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.tags?.includes(tag) ?? false}
                                        readOnly
                                        aria-hidden="true"
                                    />
                                    <span>{tag}</span>
                                </button>
                            ))}
                            {(filters.tags?.length ?? 0) > 0 && (
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, tags: [] }))}
                                    className={styles.ClearFilter}
                                    style={{ borderTop: '1px solid var(--border-color)' }}
                                >
                                    Clear all tags
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
    // Due Date filter (your existing one, updated to use setFilters)
    const DueDateFilter = (
        <div className={styles.DropdownWrapper}>
            <button
                className={styles.ModalOptions__Filter}
                onClick={() => setIsModalOpen(isModalOpen === 'DueDate' ? null : 'DueDate')}
                aria-label="Filter by due date"
            >
                <img src='./modalIcons/dueDate.svg' alt='due date' aria-hidden='true' />
                {filters.dueDate && <span className={styles.FilterBadge}>1</span>}
            </button>

            {isModalOpen === 'DueDate' && (
                <>
                    <div className={styles.DropdownBackdrop} onClick={() => setIsModalOpen(null)} />
                    <div className={styles.DropdownMenu}>
                        <div>
                            <DayPicker
                                mode="single"
                                selected={filters.dueDate ? new Date(filters.dueDate) : undefined}
                                onSelect={(date) => {
                                    if (date) {
                                        setFilters(prev => ({ ...prev, dueDate: date.toISOString() }))
                                        setIsModalOpen(null)
                                    }
                                }}
                            />
                            {filters.dueDate && (
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, dueDate: '' }))}
                                    className={styles.ClearFilter}
                                    style={{ borderTop: '1px solid var(--border-color)', width: '100%' }}
                                >
                                    Clear date
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
    return (
        <div className={styles.FiltersContainer}>
            <img src="/navBarIcons/filter.svg" alt="filter" aria-label="filter" className={styles.filterButton}></img>
            {EstimateFilter}
            {AssigneeFilter}
            {TagsFilter}
            {DueDateFilter}
        </div>
    )
}