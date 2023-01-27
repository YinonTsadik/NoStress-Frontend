export interface User {
    id: string
    firstName: string
    lastName: string
    username: string
    password: string
}

export interface Calendar {
    id: string
    userID: string
    name: string
    startDate: Date
    endDate: Date
}
