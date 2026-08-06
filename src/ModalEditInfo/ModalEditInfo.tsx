import style from './ModalEditInfo.module.css';
import type { Task, TaskStatus } from '../Task/Task';
import { pointEstimate, type PointEstimate } from '../Card/Card';
import { getFormattedDate } from '../Utils/getFormattedDate';
import { useState } from 'react';
import type { TaskTag } from '../Tag/Tag';
import 'react-day-picker/style.css';
import { DayPicker } from 'react-day-picker';
import { useQueryUsers } from '../CustomHooks/useUsers';
import type { User } from '../User/User';
import { Avatar } from '../Avatar/Avatar';
import { statuses } from '../Dashboard/Dashboard';
interface ModalInfoOptionsProps {
    onEstimate: (estimate: PointEstimate) => void;
    onAssignee: (fullName: string) => void;
    onTag: (tags: TaskTag[]) => void;
    onDueDate: (dateString: string) => void;
    onStatus: (status: TaskStatus) => void;
    onClose?: () => void;
    onName: (name: string) => void;
    task: Task;
}

type ModalStatus = 'Estimate' | 'Assignee' | 'Tag' | 'DueDate' | 'Status' | null
export function ModalEditInfoOptions({ onEstimate, onAssignee, onTag, onDueDate, onName, onStatus, onClose, task }: ModalInfoOptionsProps) {
    const ALL_TAGS: TaskTag[] = ['ANDROID', 'IOS', 'NODE_JS', 'RAILS', 'REACT']
    const [isModalOpen, setIsModalOpen] = useState<ModalStatus>(null)
    const { data: users, isLoading, error } = useQueryUsers()
    const [nameInput, setNameInput] = useState(task.name)
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

    return (<>
        <div className={style.ModalBackdrop} onClick={onClose} />
        <div className={style.Modal}>
            <div className={style.ModalInfoOptions__Container} role="menu">

                <div className={style.ModalHeader}>
                    <input value={nameInput} onChange={(e) => { setNameInput(e.target.value) }} onBlur={() => { onName(nameInput) }} ></input>
                </div>
                <div className={style.OptionsRow}>
                    <div className={style.DropdownWrapper}>
                        <button
                            className={style.ModalOptions__Edit}
                            onClick={handleUpdateEstimateModal}
                            aria-label='Edit estimate'
                        >
                            <img src='./modalIcons/estimate.svg' alt='estimate' aria-hidden='true' />
                            <span>{pointEstimate[task.pointEstimate]}</span>
                        </button>
                        {(isModalOpen === 'Estimate') &&
                            <>
                                <div className={style.DropdownBackdrop} onClick={() => setIsModalOpen(null)} />
                                <div className={style.DropdownMenu}>
                                    <div>
                                        <span>Estimate</span>
                                        {(Object.keys(pointEstimate) as PointEstimate[]).map((key) => (
                                            <button key={key} className={style.DropdownItem}
                                                onClick={() => { onEstimate(key); setIsModalOpen(null) }}
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
                            <span>{task.tags[0]}</span>
                        </button>
                        {(isModalOpen === 'Tag') &&
                            <>
                                <div className={style.DropdownBackdrop} onClick={() => setIsModalOpen(null)} />
                                <div className={style.DropdownMenu}>
                                    <div>
                                        <span>{task.tags.length} tags selected</span>
                                        {ALL_TAGS.map((key) => {
                                            const isChecked = task.tags.includes(key);

                                            return (
                                                <button
                                                    key={key}
                                                    className={style.DropdownItem}
                                                    onClick={() => {
                                                        const newTags = isChecked
                                                            ? task.tags.filter(t => t !== key)
                                                            : [...task.tags, key];
                                                        onTag(newTags);
                                                    }}
                                                    aria-label={`Toggle ${key}`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        readOnly
                                                        aria-hidden="true"
                                                    />
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
                            <span>{task.dueDate ? getFormattedDate({ dateString: task.dueDate }) : 'no Due Date assigned'}</span>
                        </button>
                        {(isModalOpen === 'DueDate') &&
                            <>
                                <div className={style.DropdownBackdrop} onClick={() => setIsModalOpen(null)} />
                                <div className={style.DropdownMenu}>
                                    <div>
                                        <DayPicker
                                            mode="single"
                                            selected={task.dueDate ? new Date(task.dueDate) : undefined}
                                            onSelect={(date) => {
                                                if (date) { onDueDate(date.toISOString()); setIsModalOpen(null) }
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
                            <span>{task.status}</span>
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
                                                onClick={() => { onStatus(key); setIsModalOpen(null) }}
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
                </div>



                <div className={style.DropdownWrapper}>
                    <button
                        className={style.ModalOptions__Edit}
                        onClick={handleUpdateAssigneeModal}
                        aria-label='Edit assignee'
                    >
                        <img src='./modalIcons/assignee.svg' alt='assignee' aria-hidden='true' />
                        <span>{task.assignee ? <Avatar avatar={task.assignee.avatar} fullName={task.assignee.fullName} size='sm' showName={true} /> : <span>No assignee</span>}</span>
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
                                                    onAssignee(user.id)
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
            </div>
        </div>
    </>)
}

