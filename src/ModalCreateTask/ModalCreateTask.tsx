import style from './ModalCreateTask.module.css';
import type { TaskStatus } from '../Task/Task';
import { pointEstimate, type PointEstimate } from '../Card/Card';
import { useState } from 'react';
import type { TaskTag } from '../Tag/Tag';
import 'react-day-picker/style.css';
import { DayPicker } from 'react-day-picker';
import { useQueryUsers } from '../CustomHooks/useUsers';
import type { User } from '../User/User';
import { Avatar } from '../Avatar/Avatar';
import { statuses } from '../Dashboard/Dashboard';
import { useCreateTask } from '../CustomHooks/useTasks';
import { useToast } from '../NotificationContext/NotificationContext';

interface ModalCreateTaskProps {
    onClose?: () => void;
}
type Draft = { status: TaskStatus, pointEstimate: PointEstimate, dueDate: string, tags: TaskTag[], name: string, assigneeId?: string }
type ModalStatus = 'Estimate' | 'Assignee' | 'Tag' | 'DueDate' | 'Status' | null
export function ModalCreateTaskOptions({ onClose }: ModalCreateTaskProps) {
    const [draft, setDraft] = useState<Draft>({ status: 'BACKLOG', pointEstimate: 'ZERO', dueDate: new Date().toISOString(), tags: [], name: '', assigneeId: undefined })
    const ALL_TAGS: TaskTag[] = ['ANDROID', 'IOS', 'NODE_JS', 'RAILS', 'REACT']
    const [isModalOpen, setIsModalOpen] = useState<ModalStatus>(null)
    const { data: users, isLoading, error } = useQueryUsers()
    const createTask = useCreateTask()
    const { showToast } = useToast()

    const handleOnEstimate = (newPointEstimate: PointEstimate) => {
        setDraft(prev => ({ ...prev, pointEstimate: newPointEstimate }))
    }
    const handleOnTag = (newTags: TaskTag[]) => {
        setDraft(prev => ({ ...prev, tags: newTags }))
    }
    const handleOnDueDate = (newDueDate: string) => {
        setDraft(prev => ({ ...prev, dueDate: newDueDate }))
    }
    const handleOnStatus = (newStatus: TaskStatus) => {
        setDraft(prev => ({ ...prev, status: newStatus }))
    }
    const handleOnName = (newName: string) => {
        setDraft(prev => ({ ...prev, name: newName }))
    }
    const handleOnAssignee = (newAssigneeId: string) => {
        setDraft(prev => ({ ...prev, assigneeId: newAssigneeId }))
    }

    const handleUpdateEstimateModal = () => {
        setIsModalOpen(isModalOpen === 'Estimate' ? null : 'Estimate')
    }
    const handleUpdateTagModal = () => {
        setIsModalOpen(isModalOpen === 'Tag' ? null : 'Tag')
    }
    const handleUpdateDueDateModal = () => {
        setIsModalOpen(isModalOpen === 'DueDate' ? null : 'DueDate')
    }
    const handleUpdateStatusModal = () => {
        setIsModalOpen(isModalOpen === 'Status' ? null : 'Status')
    }
    const handleUpdateAssigneeModal = () => {
        setIsModalOpen(isModalOpen === 'Assignee' ? null : 'Assignee')
    }
    const handleCreate = () => {
        if (!draft.name.trim()) {
            showToast('Task name is required', 'error')
            return
        }
        createTask.mutate({ input: draft },
            {
                onSuccess: () => {
                    showToast('Operation Successful', 'success')
                    onClose?.()
                },
                onError: () => {
                    showToast('Operation Failed', 'error')
                },
            }
        )
    }

    return (<>
        <div className={style.ModalBackdrop} onClick={onClose} />
        <div className={style.Modal}>
            <div className={style.ModalInfoOptions__Container} role="menu">

                <div className={style.ModalHeader}>
                    <input value={draft.name} type="text" placeholder='Task Title' onChange={(e) => handleOnName(e.target.value)}></input>
                </div>
                <div className={style.OptionsRow}>
                    <div className={style.DropdownWrapper}>
                        <button
                            className={style.ModalOptions__Edit}
                            onClick={handleUpdateEstimateModal}
                            aria-label='Edit estimate'
                        >
                            <img src='./modalIcons/estimate.svg' alt='estimate' aria-hidden='true' />
                            <span>Estimate</span>
                        </button>
                        {(isModalOpen === 'Estimate') &&
                            <>
                                <div className={style.DropdownBackdrop} onClick={() => setIsModalOpen(null)} />
                                <div className={style.DropdownMenu}>
                                    <div>
                                        <span>Estimate</span>
                                        {(Object.keys(pointEstimate) as PointEstimate[]).map((key) => (
                                            <button key={key} className={style.DropdownItem}
                                                onClick={() => { handleOnEstimate(key); setIsModalOpen(null) }}
                                                aria-label={pointEstimate[key]}

                                            >
                                                <img src='./modalIcons/estimate.svg' alt='estimate' aria-hidden='true'></img>
                                                <span>{pointEstimate[key]}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    <div className={style.DropdownWrapper}>
                        <button
                            className={style.ModalOptions__Edit}
                            onClick={handleUpdateTagModal}
                            aria-label='Edit Tag'
                        >
                            <img src='./modalIcons/tag.svg' alt='tags' aria-hidden='true' />
                            <span>Label</span>
                        </button>
                        {(isModalOpen === 'Tag') &&
                            <>
                                <div className={style.DropdownBackdrop} onClick={() => setIsModalOpen(null)} />
                                <div className={style.DropdownMenu}>
                                    <div>
                                        <span>Tags</span>
                                        {ALL_TAGS.map((key) => {
                                            const isChecked = draft.tags.includes(key);
                                            return (
                                                <button
                                                    key={key}
                                                    className={style.DropdownItem}
                                                    onClick={() => {
                                                        const newTags = isChecked
                                                            ? draft.tags.filter(t => t !== key)
                                                            : [...draft.tags, key];
                                                        handleOnTag(newTags);
                                                    }}
                                                >
                                                    <input type="checkbox" checked={isChecked} readOnly aria-hidden="true" />
                                                    <span>{key}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    <div className={style.DropdownWrapper}>
                        <button
                            className={style.ModalOptions__Edit}
                            onClick={handleUpdateDueDateModal}
                            aria-label='Edit DueDate'
                        >
                            <img src='./modalIcons/dueDate.svg' alt='dueDate' aria-hidden='true' />
                            <span>Due date</span>
                        </button>
                        {(isModalOpen === 'DueDate') &&
                            <>
                                <div className={style.DropdownBackdrop} onClick={() => setIsModalOpen(null)} />
                                <div className={style.DropdownMenu}>
                                    <div>
                                        <DayPicker
                                            mode="single"
                                            selected={draft.dueDate ? new Date(draft.dueDate) : undefined}
                                            onSelect={(date) => {
                                                if (date) { handleOnDueDate(date.toISOString()); setIsModalOpen(null) }
                                            }}
                                        />
                                    </div>
                                </div>
                            </>

                        }
                    </div>
                    <div className={style.DropdownWrapper}>
                        <button
                            className={style.ModalOptions__Edit}
                            onClick={handleUpdateStatusModal}
                            aria-label='Edit Status'
                        >
                            <img src='./cardIcons/attach.svg' alt='status' aria-hidden='true' />
                            <span>Status</span>
                        </button>
                        {(isModalOpen === 'Status') &&
                            <>
                                <div className={style.DropdownBackdrop} onClick={() => setIsModalOpen(null)} />
                                <div className={style.DropdownMenu}>

                                    <div>
                                        <span>Status</span>
                                        {statuses.map((key) => (
                                            <button
                                                key={key}
                                                className={style.DropdownItem}
                                                onClick={() => { handleOnStatus(key); setIsModalOpen(null) }}
                                                aria-label={`Toggle ${key}`}
                                            >
                                                <img src='./cardIcons/attach.svg' alt='status' aria-hidden='true'></img>
                                                <span>{key}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    <div className={style.DropdownWrapper}>
                        <button
                            className={style.ModalOptions__Edit}
                            onClick={handleUpdateAssigneeModal}
                            aria-label='Edit assignee'
                        >
                            <img src='./modalIcons/assignee.svg' alt='assignee' aria-hidden='true' />
                            <span>Assignee</span>
                        </button>


                        {(isModalOpen === 'Assignee') &&
                            <>
                                <div className={style.DropdownBackdrop} onClick={() => setIsModalOpen(null)} />
                                <div className={style.DropdownMenu}>

                                    <div>
                                        {isLoading ? (
                                            <p>Loading</p>
                                        ) : error ? (
                                            <p>Error loading this source</p>
                                        ) : !users || users.length === 0 ? (
                                            <p>No assignees available</p>
                                        ) : (
                                            users.map((user: User) => (
                                                <button
                                                    key={user.id}
                                                    onClick={() => {
                                                        handleOnAssignee(user.id)
                                                        setIsModalOpen(null)
                                                    }}
                                                    className={style.DropdownItem}
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
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    <button
                        className={style.ModalOptions__Create}
                        onClick={handleCreate}
                        aria-label='Create task'
                    >
                        <span>Create</span>
                    </button>

                    <button
                        className={style.ModalOptions__Cancel}
                        onClick={onClose}
                        aria-label='Cancel'
                    >
                        <span>Cancel</span>
                    </button>
                </div>
            </div>
        </div>
    </>)
}

