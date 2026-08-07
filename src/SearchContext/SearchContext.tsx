import { createContext, useContext, useState } from "react";
const SearchContext = createContext(null)

export function SearchProvider({ children }) {
    const [filters, setFilters] = useState({ searchTerm: '', dueDate: '' })

    return (
        <SearchContext.Provider value={{ filters, setFilters }}>
            {children}

        </SearchContext.Provider>
    )
}
export function useSearch() {
    return useContext(SearchContext)
}