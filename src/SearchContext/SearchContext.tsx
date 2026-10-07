import {  useState } from "react";
import type { Filters } from "./SearchContextValue";
import { SearchContext } from "./SearchContextValue";

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
