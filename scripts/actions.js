/**
 * Логика работы с задачами
 */

import { tasks, saveTask } from './storage.js';
import { taskInput, render, getCurrentDate } from './render.js'

/**
 * Добавляет новую задачу
 * @returns {void}
 */
export function addTask() {
    const text = taskInput.value.trim();

    if (text !== '') {
        const newTask = {
            id: Date.now(),
            text: text,
            status: 'todo',
            create: getCurrentDate()
        };

        tasks.push(newTask);
        saveTask();
        render();
        taskInput.value = '';
        taskInput.focus();
    }
}

/**
 * Удаляет все задачи
 * @returns {void}
 */
export function clearAll() {
    tasks.length = 0;
    saveTask();
    render();
}

/**
 * Перемещает задачу в новый статус
 * @param {number} id - Уникальный идентификатор задачи
 * @param {string} newStatus - Новый статус задачи
 */
export function moveTask(id, newStatus) {
    for (let item = 0; item < tasks.length; item++) {
        if (tasks[item].id === id) {
            tasks[item].status = newStatus;
            break;
        }
    }

    saveTask();
    render();
}

/**
 * Удаляет задачу по уникальному идентификатору
 * @param {number} id - Уникальный идентификатор задачи
 */
export function deleteTask(id) {
    for (let item = 0; item < tasks.length; item++) {
        if (tasks[item].id === id) {
            tasks.splice(item, 1);
            break;
        }
    }

    saveTask();
    render();
}