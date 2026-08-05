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

    return useQuery<User[]>({ queryKey, queryFn, staleTime: 30000 })
}
