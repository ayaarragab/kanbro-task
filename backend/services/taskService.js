import Task from '../models/task.js';
import User from '../models/user.js';
/**
 * Fetch all tasks with optional filters.
 * @param {Object} filter - Optional filter criteria.
 * @returns {Promise<Array>} - List of tasks.
 */

export const findTasks = async (id) => {
    const user = await User.findById(id).populate('tasks');
    const tasks = user.tasks || [];
    
    if (tasks.length === 0) {
        return false;
    }
    return tasks;
};

/**
 * Fetch a task by its ID.
 * @param {String} id - Task ID.
 * @returns {Promise<Object>} - Task object.
 */
export const findTaskById = async (id) => {
    try {
        const task = await Task.findById(id).exec();
        if (!task) {
            throw new Error('Task not found');
        }
        return task;
    } catch (error) {
        throw new Error(`Error fetching task by ID: ${error.message}`);
    }
};

/**
 * Create a new task.
 * @param {Object} taskData - Data for the new task.
 * @returns {Promise<Object>} - Created task object.
 */
export const createNewTask = async (data) => {
    console.log(data);
    
    try {
        const newTask = await Task.create(data);
        const savedTask = await newTask.save();

        return savedTask;
    } catch (error) {
        throw new Error(`Error creating new task: ${error.message}`);
    }
};