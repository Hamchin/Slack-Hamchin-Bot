'use strict';

// key: タスク (文字列)
// value: 完了または未完了 (真偽値)
let tasks = new Map();

const fs = require('fs');
const filename = './tasks.json'

try {
    const dataString = fs.readFileSync(filename, 'utf8');
    tasks = new Map(JSON.parse(dataString));
}
catch (error) {
    console.log(`${filename} から復元できませんでした`);
}

/**
 * タスクをファイルに保存する
 */
function saveTasks() {
    fs.writeFileSync(filename, JSON.stringify(Array.from(tasks)), 'utf8');
}

/**
 * タスクを追加する
 * @param {string} task
 */
function todo(task) {
    tasks.set(task, false);
    saveTasks();
}

/**
 * 未完了タスクの一覧を配列として取得する
 * @return {string[]}
 */
function list() {
    return Array.from(tasks).filter(pair => !pair[1]).map(pair => pair[0]);
}

/**
 * タスクを完了状態にする
 * @param {string} task 
 */
function done(task) {
    if (tasks.has(task)) {
        tasks.set(task, true);
        saveTasks();
    }
}

/**
 * 完了済みタスクの一覧を配列として取得する
 * @return {string[]}
 */
function donelist() {
    return Array.from(tasks).filter(pair => pair[1]).map(pair => pair[0]);
}

/**
 * タスクを削除する
 * @param {string} task 
 */
function del(task) {
    tasks.delete(task);
    saveTasks();
}

module.exports = {
    todo: todo,
    list: list,
    done: done,
    donelist: donelist,
    del: del
};
