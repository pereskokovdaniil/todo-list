/**
 * Главный файл приложения
 */

import { loadTask } from './storage.js';
import{ addBtn, clearBtn, render } from './render.js';
import { addTask, clearAll } from './actions.js';


addBtn.addEventListener('click', addTask);
clearBtn.addEventListener('click', clearAll);

loadTask();
render();