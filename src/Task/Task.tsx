import type { TaskTag } from "../Tag/Tag";
import type { User } from "../User/User";
import type { PointEstimate } from "../Card/Card"
export type Task = {
    id: string,
    status: TaskStatus,
    name: string,
    tags: TaskTag[],
    pointEstimate: PointEstimate,
    assignee: User | null,
    dueDate: string | null
    createdAt: string | null
    position: number
}
export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';


// Mock data

export const mockUsers: User[] = [
    {
        id: 'user-1',
        avatar: 'https://via.placeholder.com/32/FF6B6B/ffffff?text=SC',
        createdAt: '2026-01-15',
        email: 'sarah.chen@example.com',
        fullName: 'Sarah Chen',
        type: 'ADMIN',
        updatedAt: '2026-07-20',
    },
    {
        id: 'user-2',
        avatar: 'https://via.placeholder.com/32/4ECDC4/ffffff?text=MJ',
        createdAt: '2026-02-10',
        email: 'marcus.johnson@example.com',
        fullName: 'Marcus Johnson',
        type: 'CANDIDATE',
        updatedAt: '2026-07-25',
    },
    {
        id: 'user-3',
        avatar: 'https://via.placeholder.com/32/A8E6CF/ffffff?text=PP',
        createdAt: '2026-03-05',
        email: 'priya.patel@example.com',
        fullName: 'Priya Patel',
        type: 'ADMIN',
        updatedAt: '2026-07-28',
    },
];
export const mockTasks: Task[] = [
    {
        id: '1',
        status: 'IN_PROGRESS',
        name: 'Design dashboard mockups',
        tags: ['REACT', 'NODE_JS'],
        pointEstimate: 'EIGHT',
        assignee: mockUsers[0], // Sarah Chen
        dueDate: '2026-08-15',
        createdAt: '2026-07-20',
        position: 1,
    },
    {
        id: '2',
        status: 'TODO',
        name: 'Set up authentication flow',
        tags: ['NODE_JS', 'RAILS'],
        pointEstimate: 'ZERO',
        assignee: mockUsers[1], // Marcus Johnson
        dueDate: '2026-08-20',
        createdAt: '2026-07-18',
        position: 2,
    },
    {
        id: '3',
        status: 'BACKLOG',
        name: 'Integrate payment gateway',
        tags: ['REACT', 'NODE_JS'],
        pointEstimate: 'ONE',
        assignee: null,
        dueDate: '2026-08-10',
        createdAt: '2026-07-15',
        position: 3,
    },
    {
        id: '4',
        status: 'DONE',
        name: 'Write API documentation',
        tags: ['ANDROID', 'IOS'],
        pointEstimate: 'TWO',
        assignee: mockUsers[2], // Priya Patel
        dueDate: '2026-08-05',
        createdAt: '2026-07-10',
        position: 4,
    },
];