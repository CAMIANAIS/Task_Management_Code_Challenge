import type { Task, TaskStatus } from '../Task/Task'
import { Tag, type TaskTag } from '../Tag/Tag'
import { Avatar } from '../Avatar/Avatar'
import style from './Card.module.css'
import { getFormattedDate } from '../Utils/getFormattedDate'
import { ModalEditOptions } from '../ModalEditDelete/ModalEditDelete'
import { useState } from 'react'
import { useUpdateTask, useDeleteTask } from '../CustomHooks/useTasks'
import { ModalEditTaskOptions } from '../ModalEditTask/ModalEditTask'
import { ModalConfirmationOptions } from '../ModalConfirmation/ModalConfirmation'
import { useToast } from '../NotificationContext/NotificationContext'
import { getColoredDueDate } from '../Utils/getColoredDueDate'
type CardProps = {
    task: Task,
}
export type PointEstimate = 'ZERO' | 'ONE' | 'TWO' | 'FOUR' | 'EIGHT'
export const pointEstimate: Record<PointEstimate, string> = {
    EIGHT: '8 Pts',
    FOUR: '4 Pts',
    ONE: '1 Pt',
    TWO: '2 Pts',
    ZERO: '0 Pts',
}


export function Card({ task }: CardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isConfirmationOpen, setIsConfrmationOpen] = useState(false)
    const updateTask = useUpdateTask()
    const confirmDeleteTask = useDeleteTask()
    const dueDateColor = task.dueDate ? getColoredDueDate({ dateString: task.dueDate }) : null
    const { showToast } = useToast()
    const handleEdit = () => {
        setIsFormOpen(true)
    }
    const handleDelete = () => {
        setIsConfrmationOpen(true)
    }
    const handleUpdateEstimate = (estimate: PointEstimate) => {
        handleUpdate({ pointEstimate: estimate })
    }
    const handleUpdateTag = (tags: TaskTag[]) => {
        handleUpdate({ tags: tags })
    }
    const handleUpdateDueDate = (dateString: string) => {
        handleUpdate({ dueDate: dateString })
    }
    const handleUpdateAssignee = (userId: string) => {
        handleUpdate({ assigneeId: userId })
    }
    const handleUpdateName = (name: string) => {
        handleUpdate({ name: name })
    }
    const handleUpdateStatus = (status: TaskStatus) => {
        handleUpdate({ status: status })
    }

    const handleUpdate = (partialInput: Partial<Omit<Task, 'id'>> & { assigneeId?: string }) => {
        updateTask.mutate(
            { input: { id: task.id, ...partialInput } },
            {
                onSuccess: () => showToast('Operation Successful', 'success'),
                onError: () => showToast('Operation Failed', 'error'),
            }
        )
    }

    const handleConfirm = () => {
        confirmDeleteTask.mutate(
            { input: { id: task.id } },
            {
                onSuccess: () => showToast('Operation Successful', 'success'),
                onError: () => showToast('Operation Failed', 'error'),
            }
        )
    }
    const handleCancel = () => {
    }
    return <div className={style.card} >
        <div className={style.topNavigation}>
            <p className={style.card__title}>{task.name}</p>
            <button
                className={style.moreButton}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Task options"
                aria-haspopup="menu"
                aria-expanded={isMenuOpen}
            >
                <img className={style.moreImageIcon} src="cardIcons/more.svg" alt="more" />
            </button>
        </div>
        {isMenuOpen && (
            <ModalEditOptions
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClose={() => setIsMenuOpen(false)}
            />
        )}
        {isFormOpen && (
            <ModalEditTaskOptions
                onEstimate={handleUpdateEstimate}
                onAssignee={handleUpdateAssignee}
                onTag={handleUpdateTag}
                onDueDate={handleUpdateDueDate}
                onName={handleUpdateName}
                onStatus={handleUpdateStatus}
                onClose={() => setIsFormOpen(false)}
                task={task}
            />
        )}
        {isConfirmationOpen && (
            <ModalConfirmationOptions
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                onClose={() => setIsConfrmationOpen(false)}
            />
        )}


        <div className={style.card__description}>
            <p className={style.card__pointEstimate}>{pointEstimate[task.pointEstimate]}</p>
            <div className={style.dueDate__details} style={{ background: dueDateColor?.background }} >
                <img src="cardIcons/dueDate.svg" alt="dueDate" />
                <span className={style.card__date} style={{ color: dueDateColor?.text }} >{(task.dueDate ? getFormattedDate({ dateString: task.dueDate }) : 'no Due Date assigned')}</span>
            </div>
        </div>
        <div className={style.tags__container}>{task.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
        ))}</div>

        <div>{task.assignee ? <Avatar avatar={task.assignee.avatar} fullName={task.assignee.fullName} size='sm' showName={false} /> : <span>No assignee</span>}</div>
    </div>
}