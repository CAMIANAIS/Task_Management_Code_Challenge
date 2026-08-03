import { useQueryTasks } from "../CustomHooks/useTasks"
import type { TaskStatus } from "../Task/Task"
import { TaskColumn } from "../TaskColumn/TaskColumn"
import styles from './Dashboard.module.css'
const statuses: TaskStatus[] = ['BACKLOG', 'TODO', 'IN_PROGRESS', 'DONE', 'CANCELLED']
export function Dashboard() {
    const { data: tasks, isLoading, error } = useQueryTasks()
    return <div className={styles.container}>
        {isLoading ? <p>Loading</p> : error ? <p>Error loading this source</p> :
            tasks && statuses.map((status: TaskStatus) => <TaskColumn key={status} state={status} tasks={tasks.filter(t => t.status === status)} />)}
    </div>
}