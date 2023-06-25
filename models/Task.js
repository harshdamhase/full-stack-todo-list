import { Schema,model } from "mongoose";

const taskSchema = new Schema({
    title: String,
    Description: String,

})

const Task  = model('Task',taskSchema)

export default Task
