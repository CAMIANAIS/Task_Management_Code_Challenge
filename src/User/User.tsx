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


