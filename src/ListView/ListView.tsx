import type { Task, TaskStatus } from '../Task/Task'
import style from './ListView.module.css'
import { statuses } from '../Dashboard/Dashboard'
import { TaskListRow } from '../TaskListRow/TaskListRow'
import { status as StatusLabels } from '../TaskColumn/TaskColumn'
type ListViewProps = {
    tasks: Task[]
}

export function ListView({ tasks }: ListViewProps) {
    return (
        <div className={style.listView}>
            <ListViewSection tasks={tasks} />
        </div>
    )
}


type ListViewSectionProps = {
    tasks: Task[],
}

function ListViewSection({ tasks }: ListViewSectionProps) {
    return (
        <div className={style.sections}>
            <div className={style.headerRow}>
                <div className={style.headerCell} style={{ flex: '2' }}>Task Name</div>
                <div className={style.headerCell} style={{ flex: '1.5' }}>Task Tags</div>
                <div className={style.headerCell} style={{ flex: '0.8' }}>Estimate</div>
                <div className={style.headerCell} style={{ flex: '1.2' }}>Task Assign Name</div>
                <div className={style.headerCell} style={{ flex: '1' }}>Due Date</div>
                <div className={style.headerCell} style={{ flex: '0.4' }}></div>
            </div>

            {statuses.map((status: TaskStatus) => {
                const statusTasks = tasks.filter(t => t.status === status)

                if (statusTasks.length === 0) return null

                return (
                    <div key={status} className={style.statusSection}>
                        <div className={style.statusHeader}>
                            <h3 className={style.statusTitle}>{StatusLabels[status]}</h3>
                            <span className={style.statusCount}>{statusTasks.length}</span>
                        </div>

                        {statusTasks.map((task, index) => (
                            <TaskListRow
                                key={task.id}
                                task={task}
                                index={index}
                            />
                        ))}
                    </div>
                )
            })}
        </div>
    )
}
