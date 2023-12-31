import express, { response } from "express";
import mongoose from "mongoose";
import dotenv  from "dotenv";
dotenv.config();

import Task  from './models/Task.js';

const app =express();
app.use(express.json());

async function connectMongoDB(){
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        if(conn)
        {
            console.log("Connected to mongodb");
        }
}
connectMongoDB();

app.get('/health', (req, res)=>{
    res.json({
        success: true,
        message: 'All good'
    })
})

//post Task
app.post('/task', async (req,res)=>{
    const {title,description} = req.body;

    const newTask = new Task({
        title: title,
        description: description
    })
    const savedTask = await newTask.save();

    res.json({
        success: true,
        message: 'Task save successfully',
        data: savedTask
    })
})

//get Task 

app.get('/tasks', async (req, res)=>{
    const tasks = await Task.find();

    res.json({
        super: true,
        message: 'All tasks fetched successfully',
        data: tasks
    })
});
//get  specific task

app.get('/task', async (req, res) =>{
    const taskId = req.query.taskId;

    let task = await Task.findById({taskId})

    if(!task){
        return res.json({
            success: false,
            message: "Task not found",
            data: []

        })
    }
    res.json({
        success: true,
        message: "Task successfully fetched",
        data: task
    })
})

app.post("/task/delete",async (req,res) =>{
    const {taskId} = req.body;

    await Task.deleteOne({
        _id: taskId

    })
    res.json({
        success: true,
        message: "Task deleted successfully"
    })
})



//put Task

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log('listening on port' + PORT);
});

