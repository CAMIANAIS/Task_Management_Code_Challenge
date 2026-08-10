import { useQueryTasks } from "../CustomHooks/useTasks"
import { NotificationProvider } from "../NotificationContext/NotificationContext"
import type { TaskStatus } from "../Task/Task"
import { TaskColumn } from "../TaskColumn/TaskColumn"
import styles from './Dashboard.module.css'
import { ModalGridCreateButtons, type ViewMode } from "../GridCreateButtons/GridCreateButtons"
import { useState } from "react"
import { ModalCreateTaskOptions } from "../ModalCreateTask/ModalCreateTask"
import { useSearch } from "../SearchContext/SearchContext"
import { ListView } from "../ListView/ListView"
import { TaskFilters } from "../TaskFilters/TaskFilters"
export const statuses: TaskStatus[] = ['BACKLOG', 'TODO', 'IN_PROGRESS', 'DONE', 'CANCELLED']
export function Dashboard() {
    const { filters } = useSearch()
    const { data: tasks, isLoading, error } = useQueryTasks(filters)
    const [isCurrentView, setIsCurrentView] = useState<ViewMode>('LIST')
    const [isCreatingNewTask, setIsCreatingNewTask] = useState(false)

    return (
        <NotificationProvider>
            <ModalGridCreateButtons currentView={isCurrentView} onViewChange={setIsCurrentView} onCreate={() => setIsCreatingNewTask(true)} ></ModalGridCreateButtons>
            <TaskFilters></TaskFilters>
            <div className={isCurrentView === 'GRID' ? styles.container : styles.listContainer}>
                {isLoading ? (
                    <p>Loading</p>
                ) : error ? (
                    <p>Error loading this source</p>
                ) : !tasks || tasks.length === 0 ? (
                    <p>No results found</p>
                ) : isCurrentView === 'GRID' ? (
                    statuses.map((status: TaskStatus) => {
                        const statusTasks = tasks.filter(t => t.status === status);
                        return (
                            <TaskColumn
                                key={status}
                                state={status}
                                tasks={statusTasks}
                                count={statusTasks.length}
                            />
                        );
                    })
                ) : (

                    <ListView tasks={tasks} />
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