
export interface ToDoInputType {
    content: string,
    startTime: string,
    endTime: string,
}

export type flagType = "done" | "active" | undefined

export type ToDoListItemType = ToDoInputType & {
    id: number
    flag: flagType
}

export enum timeFormat {
    en = "MMMM D, YYYY h:mm"
}
