import type { Task } from '../Task/Task'
import type { TaskStatus } from '../Task/Task'
import { Card } from '../Card/Card'
import styles from './TaskColumn.module.css'
import { status } from '../constants/constants'
type TaskColumnProps = {
    state: TaskStatus,
    tasks: Task[],
    count: number,
}

export function TaskColumn({ state, tasks, count }: TaskColumnProps) {
    return <div className={styles.taskColumn}>
        <span className={styles.taskColumn__status}>{status[state]} {count > 0 && `(${count.toString().padStart(2, '0')})`}</span>
        <div>{tasks.map((task) => (
            <Card key={task.id} task={task} />
        ))}</div>
    </div>
}
