import type { Task } from '../Task/Task'
import { Tag } from '../Tag/Tag'
import { Avatar } from '../Avatar/Avatar'
import style from './Card.module.css'
import { getFormattedDate } from '../Utils/getFormattedDate'
import { ModalOptions } from '../Modal/Modal'
import { useState } from 'react'
import { useUpdateTask } from '../CustomHooks/useTasks'
type CardProps = {
    task: Task,
}
const pointEstimate: Record<string, string> = {
    EIGHT: '8 Pts',
    FOUR: '4 Pts',
    ONE: '1 Pt',
    TWO: '2 Pts',
    ZERO: '0 Pts',
}


export function Card({ task }: CardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const updateTask = useUpdateTask()
    const handleEdit = () => {
        updateTask.mutate({ input: { id: task.id, status: 'TODO', name: 'abc' } })
    }
    const handleDelete = () => {
        console.log("funciona")
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
            <ModalOptions
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClose={() => setIsMenuOpen(false)}
            />
        )}

        <div className={style.card__description}>
            <p className={style.card__pointEstimate}>{pointEstimate[task.pointEstimate]}</p>
            <div className={style.dueDate__details}>
                <img src="cardIcons/dueDate.svg" alt="dueDate" />
                <span className={style.card__date}>{getFormattedDate({ dateString: task.dueDate })}</span>
            </div>
        </div>
        <div className={style.tags__container}>{task.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
        ))}</div>
        <div>{task.assignee ? <Avatar avatar={task.assignee.avatar} fullName={task.assignee.fullName} size='sm' showName={false} /> : <span>No assignee</span>}</div>
    </div>
}