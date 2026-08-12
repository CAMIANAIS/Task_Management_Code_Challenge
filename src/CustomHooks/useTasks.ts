import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Task, TaskStatus } from "../Task/Task";
import { fetchData } from "../FetchData/fetchData";
import type { PointEstimate } from "../Card/Card";
import type { TaskTag } from "../Tag/Tag";

const TASKS_QUERY = `query getTasks($input: FilterTaskInput!){  
                        tasks(input: $input){ 
                            id
                            status
                            name
                            tags
                            pointEstimate
                            assignee { 
                                id
                                fullName
                                avatar
                            }
                            dueDate
                            createdAt
                            position 
                            } 
                    }
                `;
export function useQueryTasks(filters?: { searchTerm?: string; dueDate?: string; tags?: TaskTag[]; pointEstimate?: PointEstimate, assigneeId?: string }) {
    const queryKey = ['tasks', filters]
    const queryFn = async () => {
        const input = {
            ...(filters?.searchTerm && { name: filters.searchTerm }),
            ...(filters?.dueDate && { dueDate: filters.dueDate }),
            ...(filters?.pointEstimate && { pointEstimate: filters.pointEstimate }),
            ...(filters?.assigneeId && { assigneeId: filters.assigneeId }),
            ...(filters?.tags?.length && { tags: filters.tags })
        }
        const data = await fetchData(TASKS_QUERY, { input })
        return data.tasks
    }
    return useQuery<Task[]>({ queryKey, queryFn })
}

const TASKS_QUERY_UPDATE = `mutation updateTask($input: UpdateTaskInput!){  
                        updateTask(input: $input){ 
                            id
                            status
                            name
                            tags
                            pointEstimate
                            assignee { 
                                id
                                fullName
                                avatar
                            }
                            dueDate
                            createdAt
                            position 
                            } 
                    }
                `;

export function useUpdateTask() {
    const storedQueryClient = useQueryClient()
    return useMutation({
        mutationFn: async (variables: { input: Partial<Omit<Task, 'id'>> & { id: string } & { assigneeId?: string } }) => {
            const data = await fetchData(TASKS_QUERY_UPDATE, variables)
            return data.updateTask
        },
        onSuccess: () => {
            storedQueryClient.invalidateQueries({ queryKey: ['tasks'] })
        }
    })
}
const TASKS_QUERY_DELETE = `mutation deleteTask($input: DeleteTaskInput!){
                        deleteTask(input: $input) 
                            {id}
                    }
                `;
export function useDeleteTask() {
    const storedQueryClient = useQueryClient()
    return useMutation({
        mutationFn: async (variables: { input: { id: string } }) => {
            const data = await fetchData(TASKS_QUERY_DELETE, variables)
            return data.deleteTask
        },
        onSuccess: () => {
            storedQueryClient.invalidateQueries({ queryKey: ['tasks'] })
        }
    })
}

const TASKS_QUERY_CREATE = `mutation createTask($input: CreateTaskInput!){  
                        createTask(input: $input){ 
                            id
                            status
                            name
                            tags
                            pointEstimate
                            assignee { 
                                id
                                fullName
                                avatar
                            }
                            dueDate
                            } 
                    }
                `;

export function useCreateTask() {
    const storedQueryClient = useQueryClient()
    return useMutation({
        mutationFn: async (variables: { input: { status: TaskStatus; name: string; tags: TaskTag[]; pointEstimate: PointEstimate; dueDate: string; assigneeId?: string } }) => {
            const data = await fetchData(TASKS_QUERY_CREATE, variables)
            return data.createTask
        },
        onSuccess: () => {
            storedQueryClient.invalidateQueries({ queryKey: ['tasks'] })
        }
    })
}