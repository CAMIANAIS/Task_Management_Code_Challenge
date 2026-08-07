import { useQueryTasks } from "../CustomHooks/useTasks"
import { NotificationProvider } from "../NotificationContext/NotificationContext"
import type { TaskStatus } from "../Task/Task"
import { TaskColumn } from "../TaskColumn/TaskColumn"
import styles from './Dashboard.module.css'
import { ModalGridCreateButtons, type ViewMode } from "../GridCreateButtons/GridCreateButtons"
import { useState } from "react"
import { ModalCreateTaskOptions } from "../ModalCreateTask/ModalCreateTask"
import { useSearch } from "../SearchContext/SearchContext"

export const statuses: TaskStatus[] = ['BACKLOG', 'TODO', 'IN_PROGRESS', 'DONE', 'CANCELLED']
export function Dashboard() {
    const { filters, setFilters } = useSearch()
    const { data: tasks, isLoading, error } = useQueryTasks(filters)
    const [isCurrentView, setIsCurrentView] = useState<ViewMode>('LIST')
    const [isCreatingNewTask, setIsCreatingNewTask] = useState(false)

    return (
        <NotificationProvider>
            <ModalGridCreateButtons currentView={isCurrentView} onViewChange={setIsCurrentView} onCreate={() => setIsCreatingNewTask(true)} ></ModalGridCreateButtons>
            <div className={styles.container}>
                {isLoading ? (
                    <p>Loading</p>
                ) : error ? (
                    <p>Error loading this source</p>
                ) : !tasks || tasks.length === 0 ? (
                    <p>No results found</p>
                ) : (
                    statuses.map((status: TaskStatus) => (
                        <TaskColumn
                            key={status}
                            state={status}
                            tasks={tasks.filter(t => t.status === status)}
                        />
                    ))
                )}
            </div>
            {isCreatingNewTask && (
                <ModalCreateTaskOptions
                    onClose={() => setIsCreatingNewTask(false)}
                />
            )

            }

        </NotificationProvider >
    )
}