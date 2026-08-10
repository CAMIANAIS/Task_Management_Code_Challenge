import type { Task } from '../Task/Task'
import type { TaskStatus } from '../Task/Task'
import { Card } from '../Card/Card'
import styles from './TaskColumn.module.css'

type TaskColumnProps = {
    state: TaskStatus,
    tasks: Task[],
    count: number,
}

export const status: Record<TaskStatus, string> = {
    BACKLOG: 'Backlog',
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
    CANCELLED: 'Cancelled',
}
export function TaskColumn({ state, tasks, count }: TaskColumnProps) {
    return <div className={styles.taskColumn}>
        <span className={styles.taskColumn__status}>{status[state]} {count > 0 && `(${count.toString().padStart(2, '0')})`}</span>
        <div>{tasks.map((task) => (
            <Card key={task.id} task={task} />
        ))}</div>
    </div>
}
