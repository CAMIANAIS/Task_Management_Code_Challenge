import type { Task } from '../Task/Task'
import { Tag } from '../Tag/Tag'
import { Avatar } from '../Avatar/Avatar'
import style from './Card.module.css'
type CardProps = {
    task: Task,
}

export function Card({ task }: CardProps) {
    return <div>
        <p>{task.name}</p>
        <div className={style.tags__container}>{task.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
        ))}</div>
        <p>{task.pointEstimate}</p>
        <p>{task.dueDate}</p>
        <div>{task.assignee ? <Avatar avatar={task.assignee.avatar} fullName={task.assignee.fullName} size='sm' showName={true} /> : <span>No assignee</span>}</div>
    </div>
}