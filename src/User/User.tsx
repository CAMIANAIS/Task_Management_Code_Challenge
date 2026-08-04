export type User = {
    id: string
    avatar: string,
    createdAt: string,
    email: string,
    fullName: string,
    type: UserType,
    updatedAt: string | null
}

type UserType = 'ADMIN' | 'CANDIDATE'



export function User({ id, avatar, createdAt, email, fullName, type, updatedAt }: User) {
    return <div>
        <p>{id}</p>
    </div>
}