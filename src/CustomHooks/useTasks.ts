import { useMutation, useQuery } from "@tanstack/react-query";
import type { Task } from "../Task/Task";
import { fetchData } from "../FetchData/fetchData";

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

export function useQueryTasks() {
    const queryKey = ['tasks']
    const queryFn = async () => {
        const data = await fetchData(TASKS_QUERY, { input: {} })
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
    return useMutation({
        mutationFn: async (variables: { input: { id: string; status: string; name: string } }) => {
            const data = await fetchData(TASKS_QUERY_UPDATE, variables)
            return data.updateTask
        }
    })
}