'use strict';

// Description:
//   タスクを管理することができるボットです
// Commands:
//   ボット名 add      - タスクを追加する
//   ボット名 done     - タスクを完了にする
//   ボット名 del      - タスクを削除する
//   ボット名 list     - タスクの一覧表示
//   ボット名 donelist - 完了したタスクの一覧表示
const todo = require('./todo.js');

module.exports = (robot) => {
    robot.respond(/add (.+)/i, (msg) => {
        const task = msg.match[1].trim();
        todo.add(task);
        msg.send(`タスクを追加しました: ${task}`);
    });
    robot.respond(/done (.+)/i, (msg) => {
        const task = msg.match[1].trim();
        todo.done(task);
        msg.send(`タスクを完了にしました: ${task}`);
    });
    robot.respond(/del (.+)/i, (msg) => {
        const task = msg.match[1].trim();
        todo.del(task);
        msg.send(`タスクを削除しました: ${task}`);
    });
    robot.respond(/list/i, (msg) => {
        const list = todo.list();
        if (list.length === 0) {
            msg.send('タスクはありません');
        }
        else {
            msg.send(`タスク一覧:\n${list.map(task => `・${task}`).join('\n')}`);
        }
    });
    robot.respond(/donelist/i, (msg) => {
        const donelist = todo.donelist();
        if (donelist.length === 0) {
            msg.send('完了済みタスクはありません');
        }
        else {
            msg.send(`完了済みタスク一覧:\n${donelist.map(task => `・${task}`).join('\n')}`);
        }
    });
};
