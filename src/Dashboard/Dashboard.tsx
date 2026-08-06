import { useQueryTasks } from "../CustomHooks/useTasks"
import { NotificationProvider } from "../NotificationContext/NotificationContext"
import type { TaskStatus } from "../Task/Task"
import { TaskColumn } from "../TaskColumn/TaskColumn"
import styles from './Dashboard.module.css'
export const statuses: TaskStatus[] = ['BACKLOG', 'TODO', 'IN_PROGRESS', 'DONE', 'CANCELLED']
export function Dashboard() {
    const { data: tasks, isLoading, error } = useQueryTasks()
    return (
        <NotificationProvider>
            <div className={styles.container}>
                {isLoading ? <p>Loading</p> : error ? <p>Error loading this source</p> :
                    tasks && statuses.map((status: TaskStatus) => <TaskColumn key={status} state={status} tasks={tasks.filter(t => t.status === status)} />)}
            </div>
        </NotificationProvider>
    )
}