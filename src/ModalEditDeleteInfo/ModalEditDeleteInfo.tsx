import style from './ModalEditDeleteInfo.module.css';
import type { Task } from '../Task/Task';
import { pointEstimate, type PointEstimate } from '../Card/Card';
import { getFormattedDate } from '../Utils/getFormattedDate';
import { useState } from 'react';
import type { TaskTag } from '../Tag/Tag';
import 'react-day-picker/style.css';
import { DayPicker } from 'react-day-picker';
import { useQueryUsers } from '../CustomHooks/useUsers';
import type { User } from '../User/User';
import { Avatar } from '../Avatar/Avatar';
interface ModalInfoOptionsProps {
    onEstimate: (estimate: PointEstimate) => void;
    onAssignee: (fullName: string) => void;
    onTag: (tags: TaskTag[]) => void;
    onDueDate: (dateString: string) => void;
    onClose?: () => void;
    task: Task;
}

type ModalStatus = 'Estimate' | 'Assignee' | 'Tag' | 'DueDate' | null
export function ModalInfoOptions({ onEstimate, onAssignee, onTag, onDueDate, onClose, task }: ModalInfoOptionsProps) {
    const ALL_TAGS: TaskTag[] = ['ANDROID', 'IOS', 'NODE_JS', 'RAILS', 'REACT']
    const [isModalOpen, setIsModalOpen] = useState<ModalStatus>(null)
    const { data: users, isLoading, error } = useQueryUsers()
    const handleUpdateEstimateModal = () => {
        setIsModalOpen(isModalOpen === 'Estimate' ? null : 'Estimate')
    }
    const handleUpdateTagModal = () => {
        setIsModalOpen(isModalOpen === 'Tag' ? null : 'Tag')
    }
    const handleUpdateDueDateModal = () => {
        setIsModalOpen(isModalOpen === 'DueDate' ? null : 'DueDate')
    }

    return <div className={style.ModalInfoOptions__Container} role="menu">
        <p className={style.modal__title}>{task.name}</p>
        <button
            className={style.ModalOptions__Edit}
            onClick={handleUpdateEstimateModal}
            aria-label='Edit estimate'
        >
            <img src='./modalIcons/estimate.svg' alt='estimate' aria-hidden='true' />
            <span>{pointEstimate[task.pointEstimate]}</span>
        </button>
        <button
            className={style.ModalOptions__Edit}
            onClick={handleUpdateTagModal}
            aria-label='Edit Tag'
        >
            <img src='./modalIcons/tag.svg' alt='tags' aria-hidden='true' />
            <span>{task.tags[0]}</span>
        </button>
        <button
            className={style.ModalOptions__Edit}
            onClick={handleUpdateDueDateModal}
            aria-label='Edit DueDate'
        >
            <img src='./modalIcons/dueDate.svg' alt='dueDate' aria-hidden='true' />
            <span>{task.dueDate ? getFormattedDate({ dateString: task.dueDate }) : 'no Due Date assigned'}</span>
        </button>

        {(isModalOpen === 'Estimate') &&
            <div>
                <span>Estimate</span>
                {(Object.keys(pointEstimate) as PointEstimate[]).map((key) => (
                    <button key={key} className={style.ModalOptions__Update}
                        onClick={() => { onEstimate(key); setIsModalOpen(null) }}
                        aria-label={pointEstimate[key]}

                    >
                        <img src='./modalIcons/estimate.svg' alt='estimate' aria-hidden='true'></img>
                        <span>{pointEstimate[key]}</span>
                    </button>
                ))}
            </div>
        }


        {(isModalOpen === 'Tag') &&
            <div>
                <span>{task.tags.length} tags selected</span>
                {ALL_TAGS.map((key) => {
                    const isChecked = task.tags.includes(key);

                    return (
                        <button
                            key={key}
                            className={style.ModalOptions__Update}
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
        }
        {(isModalOpen === 'DueDate') &&
            <div>
                <DayPicker
                    mode="single"
                    selected={task.dueDate ? new Date(task.dueDate) : undefined}
                    onSelect={(date) => {
                        if (date) { onDueDate(date.toISOString()); setIsModalOpen(null) }
                    }}
                />
            </div>
        }
        {(isModalOpen === 'Assignee') &&
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
                            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
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
        }
    </div>
}

