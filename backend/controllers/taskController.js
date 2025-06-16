import { findTasks, findTaskById, createNewTask } from '../services/taskService.js';
import { configureSuccessResponse, configureErrorResponse } from '../utils.js/responseConfigurations.js';
import serverErrorsHandler from '../utils.js/serverErrorsHandler.js';


export const getTasks = async (request, response) => {
    try {
        const { page = 1, limit = 10 } = request.query;
        const { tasks, totalTasks } = await findTasks(page, limit);
        const data = {
            tasks,
            totalTasks,
            totalPages: Math.ceil(totalTasks / limit),
            currentPage: parseInt(page),
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
        return configureSuccessResponse(response, "Task created successfully", newTask);
    } catch (error) {
        serverErrorsHandler(response, error);
    }
};

export const updateTask = async (request, response) => {

}

export const deleteTask = async (request, response) => {

}