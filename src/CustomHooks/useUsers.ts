import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../FetchData/fetchData";
import type { User } from "../User/User";

const USERS_QUERY = `query getUsers{  
                        users{ 
                                id
                                fullName
                                avatar
                            } 
                    }
                `;

export function useQueryUsers() {
    const queryKey = ['users']
    const queryFn = async () => {
        const data = await fetchData(USERS_QUERY)
        return data.users
    }

    return useQuery<User[]>({ queryKey, queryFn, staleTime: 300000 })
}
const PROFILE_QUERY = `query getProfile{  
                        profile{
                                id
                                avatar
                                createdAt
                                email
                                fullName
                                type
                                updatedAt
                            } 
                    }       
                `;

export function useQueryProfile() {
    const queryKey = ['profiles']
    const queryFn = async () => {
        const data = await fetchData(PROFILE_QUERY)
        return data.profile
    }
    return useQuery<User>({ queryKey, queryFn, staleTime: 300000 })
}
