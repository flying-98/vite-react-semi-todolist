import { Db } from "@/utils/index"

export const db = new Db("todolist", {
    list: ["content", "startTime", "endTime", "flag"],
})