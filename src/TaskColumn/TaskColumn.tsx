import type { Task } from '../Task/Task'
import type { TaskStatus } from '../Task/Task'
import { Card } from '../Card/Card'
type TaskColumnProps = {
    state: TaskStatus,
    tasks: Task[]
}
export function TaskColumn({ state, tasks }: TaskColumnProps) {
    return <div>
        <span>{state}</span>
        <div>{tasks.map((task) => (
            <Card key={task.idTask} task={task} />
        ))}</div>
    </div>
}
