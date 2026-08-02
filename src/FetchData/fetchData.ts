const token = import.meta.env.VITE_API_TOKEN
const url = 'https://syn-api-production-e95c.up.railway.app/graphql'

export function fetchData(query: string, variables: Record<string, any> = {}) {
    const message = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ query, variables }),
    }
    return fetch(url, message).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json().then((data) => {
            if (data.errors) {
                throw new Error(`GraphQL error! ${data.errors.map((error: any) => error.message).join(', ')}`);
            }
            return data.data;
        })
    })
};
