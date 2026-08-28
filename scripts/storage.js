/**
 * Управление данными
 */

export let tasks = [];
const STORAGE_KEY = 'f49606ccbd5f9';

/**
 * Сохраняет массив задач в LocalStorage
 * @returns {void}
 */
export function saveTask() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Загружает массив задач из LocalStorage
 * @returns {void}
 */
export function loadTask() {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored !== null) {
        tasks = JSON.parse(stored);
    } else {
        tasks = [];
    }
}