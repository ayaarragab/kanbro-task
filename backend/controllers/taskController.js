import { findTasks, findTaskById, createNewTask } from '../services/taskService.js';
import { configureSuccessResponse, configureErrorResponse } from '../utils.js/responseConfigurations.js';
import serverErrorsHandler from '../utils.js/serverErrorsHandler.js';
import User from '../models/user.js';
import Task from '../models/task.js';

export const getTasks = async (request, response) => {
    try {
        const { page = 1, limit = 10 } = request.query;
        const id = request.user.id;
        const tasks = await findTasks(id, { page, limit });
        const data = {
            tasks,
        }
        return configureSuccessResponse(response, "Here're your tasks", data);
    } catch (error) {
        serverErrorsHandler(response, error);
    }
};

export const getOneTask = async (request, response) => {
    try {
        const { taskId } = request.params;
        const task = await findTaskById(taskId);
        if (!task) {
            return configureErrorResponse(response, 404, 'Task not found');
        }
        return configureSuccessResponse(response, "Task retrieved successfully", task);
    } catch (error) {
        serverErrorsHandler(response, error);
    }
};

export const createTask = async (request, response) => {
    try {
        const taskData = request.body;
        
        const newTask = await createNewTask(taskData);
        const user = request.user;
        await User.findByIdAndUpdate(
            user._id,
            { $push: { tasks: newTask.id } },
        );
        return configureSuccessResponse(response, "Task created successfully", newTask);
    } catch (error) {
        serverErrorsHandler(response, error);
    }
};

export const updateTask = async (request, response) => {
    try {
        const { taskId } = request.params;
        const updateData = request.body;
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            updateData,
            { new: true }
        );
        if (!updatedTask) {
            configureErrorResponse(response, 404, 'Task not found');
        }
        configureSuccessResponse(response, 'task created successfully', updateTask);
    }catch(error) {
        console.log(error);   
    }
}

export const deleteTask = async (request, response) => {
    try {
        const { taskId } = request.params;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return configureErrorResponse(response, 404, 'Task not found');
        }
        const user = request.user;
        await User.findByIdAndUpdate(
            user._id,
            { $pull: { tasks: taskId } }
        );
        return configureSuccessResponse(response, 'Task deleted successfully', deletedTask);
    } catch (error) {
        serverErrorsHandler(response, error);
    }
};