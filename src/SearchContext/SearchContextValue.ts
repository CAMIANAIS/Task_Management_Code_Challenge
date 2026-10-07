import { createContext} from "react";
import type { TaskTag } from "../Tag/Tag";
import type { PointEstimate } from "../constants/constants";

export type Filters = {
    searchTerm: string
    dueDate: string
    pointEstimate?: PointEstimate
    assigneeId?: string
    tags?: TaskTag[]
}


export type SearchContextType = {
    filters: Filters
    setFilters: React.Dispatch<React.SetStateAction<Filters>>
} | null
export const SearchContext = createContext<SearchContextType>(null)