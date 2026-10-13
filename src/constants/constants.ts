import type { TaskStatus } from "../Task/Task"
import type { PointEstimate } from "../Task/Task"
export const pointEstimate: Record<PointEstimate, string> = {
    EIGHT: '8 Pts',
    FOUR: '4 Pts',
    ONE: '1 Pt',
    TWO: '2 Pts',
    ZERO: '0 Pts',
}
export const statuses: TaskStatus[] = ['BACKLOG', 'TODO', 'IN_PROGRESS', 'DONE', 'CANCELLED']

export const status: Record<TaskStatus, string> = {
    BACKLOG: 'Backlog',
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
    CANCELLED: 'Cancelled',
}