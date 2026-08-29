/**
 * Отрисовка интерфейса
 */

import { tasks } from './storage.js';
import { moveTask, deleteTask } from './actions.js';


export const taskInput = document.getElementById('taskInput');
export const addBtn = document.getElementById('addBtn');
export const clearBtn = document.getElementById('clearBtn');

const totalCount = document.getElementById('totalCount');
const doingCount = document.getElementById('doingCount');
const doneCount = document.getElementById('doneCount');

const todoList = document.getElementById('todoList');
const doingList = document.getElementById('doingList');
const doneList = document.getElementById('doneList')

/**
 * Отрисовывает все задачи в трех колонках и обновляет статистику
 * @returns {void}
 */
export function render() {
    todoList.innerHTML = '';
    doingList.innerHTML = '';
    doneList.innerHTML= '';

    for (let item = 0; item < tasks.length; item++) {
        const task = tasks[item];

        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';

        const dateSpan = document.createElement('div');
        dateSpan.className = 'task-date';
        dateSpan.innerHTML = `<i class="fa-solid fa-calendar"></i> Задача создана: ${task.create}`;
        taskDiv.appendChild(dateSpan);

        const firstHr = document.createElement('hr');
        taskDiv.appendChild(firstHr);

        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = task.text;
        taskDiv.appendChild(textSpan);

        const endHr = document.createElement('hr');
        taskDiv.appendChild(endHr);

        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'task-buttons';
        taskDiv.appendChild(buttonDiv);

        if (task.status === 'todo') {
            const btnStart = document.createElement('button');
            btnStart.className = 'task-btn';
            btnStart.innerHTML = '<i class="fa-solid fa-play"></i>';
            btnStart.onclick = function() {
                moveTask(task.id, 'doing');
            }
            buttonDiv.appendChild(btnStart);
        } else if (task.status === 'doing') {
            const btnBack = document.createElement('button');
            btnBack.className = 'task-btn';
            btnBack.innerHTML = '<i class="fa-solid fa-left-long"></i>';
            btnBack.onclick = function() {
                moveTask(task.id, 'todo');
            }
            buttonDiv.appendChild(btnBack);

            const btnDone = document.createElement('button');
            btnDone.className = 'task-btn';
            btnDone.innerHTML = '<i class="fa-solid fa-check"></i>';
            btnDone.onclick = function() {
                moveTask(task.id, 'done');
            }
            buttonDiv.appendChild(btnDone);
        }
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'task-btn';
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.onclick = function() {
            deleteTask(task.id);
        }
        buttonDiv.appendChild(deleteBtn);


        if (task.status === 'todo') {
            todoList.appendChild(taskDiv);
        } else if (task.status === 'doing') {
            doingList.appendChild(taskDiv);
        } else if (task.status === 'done') {
            doneList.appendChild(taskDiv);
        }
    }

    let doingCountValue = 0;
    let doneCountValue = 0;

    for (let item = 0; item < tasks.length; item++) {
        if (tasks[item].status === 'doing') {
            doingCountValue++;
        } else if (tasks[item].status === 'done') {
            doneCountValue++;
        }
    }

    totalCount.textContent = tasks.length;
    doingCount.textContent = doingCountValue;
    doneCount.textContent = doneCountValue;
}

/**
 * Возвращает текущую дату в формате ДД.ММ.ГГГГ
 * @returns {string}
 */
export function getCurrentDate()  {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
        day = `0${day}`;
    }
    if (month < 10) {
        month = `0${month}`
    }

    return `${day}.${month}.${year}`;
}