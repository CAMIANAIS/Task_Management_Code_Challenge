import { createContext, useContext, useState } from "react";
import type { TaskTag } from "../Tag/Tag";
import type { PointEstimate } from "../Card/Card";

type Filters = {
    searchTerm: string
    dueDate: string
    pointEstimate?: PointEstimate
    assigneeId?: string
    tags?: TaskTag[]
}
type SearchContextType = {
    filters: Filters
    setFilters: React.Dispatch<React.SetStateAction<Filters>>
} | null
const SearchContext = createContext<SearchContextType>(null)

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [filters, setFilters] = useState<Filters>({
        searchTerm: '',
        dueDate: '',
        pointEstimate: undefined,
        assigneeId: undefined,
        tags: []
    })

    return (
        <SearchContext.Provider value={{ filters, setFilters }}>
            {children}

        </SearchContext.Provider >
    )
}
export function useSearch() {
    const context = useContext(SearchContext)
    if (!context) throw new Error('useSearch must be used within a SearchProvider')
    return context
}