'use strict';
var readline = require('readline');
/**
 * startApp - Starts the applucation
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log("Welcome to " + name + "'s application!");
  console.log("--------------------");
}


/**
 * onDataReceived - Decides what to do depending on the data that was received
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (mode == "normal") {

    if (text === 'quit\n' || text === 'exit\n') {
      quit();
    } else if (text === 'hello\n') {
      hello();
    } else if (text === 'help\n') {
      help();
    } else if (text.startsWith('hello ') && text.endsWith("\n")) {
      helloSomeone(text.slice(6, text.length - 1));
    } else if (text.startsWith('add ') && text.endsWith("\n")) {
      add(text.slice(4, text.length - 1));
    } else if (text === 'list\n') {
      list();
    } else if (text === "remove\n") {
      remove();
    } else if (text.startsWith('remove ') && text.endsWith("\n")) {
      removeByIndex(parseInt(text.slice(7, text.length - 1)));
    } else if (text.startsWith('edit ') && (/\d+/.test(text.trim().slice(5, text.length - 1))) && text.endsWith("\n")) {
      var index = parseInt(text.slice(5, text.length - 1));
      editModeByIndex(index);
    } else if (text === "edit\n") {
      if (tasks.length > 0) {
        var index = tasks.length - 1;
        editModeByEdit();
      } else {
        console.log("\nyour task list is empty\n");
      }
    } else if (text.startsWith('do ') && (/\d+/.test(text.trim().slice(5, text.length - 1))) && text.endsWith("\n")) {
      if (tasks.length > 0) {
        var index = tasks.length - 1;
        done(index);
      } else {
        console.log("\nyour task list is empty\n");
      }

    } else if (text.startsWith('undo ') && (/\d+/.test(text.trim().slice(5, text.length - 1))) && text.endsWith("\n")) {
      if (tasks.length > 0) {
        var index = tasks.length - 1;
        undone(index);
      } else {
        console.log("\nyour task list is empty\n")
      }
    } else {
      unknownCommand(text);
    }
  } else if (mode == "edit") {

    if (text.trim() == "") {
      console.log("nothing changed going back to normal mode");
      mode = "normal";
    } else {
      tasks[index].name = text;
      mode = "normal";
    }
  }
}


/**
 * unknownCommand - Runs when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('\nunknown command: "' + c.trim() + '"\n')
}


/**
 * hello - Says hello
 *
 * @returns {void}
 */
function hello() {
  console.log('\nhello!\n')
}

function helloSomeone(x) {
  console.log('\nhello ' + x + "!\n");
}
/**
 * add - adds a task and stores it in an array
 *
 * @returns {void}
 */
function add(x) {
  var task = {
    name: x,
    status: "undone"
  };
  tasks.push(task);
  console.log('\nadded task: "' + x + '"\n');
}
/**
 * list - lists tasks
 *
 * @returns {void}
 */
function list() {
  console.log("\nhere's the list of tasks:")
  for (var i = 0; i < tasks.length; i++) {
    console.log((i + 1) + " - " + tasks[i].name + ", status: " + tasks[i].status);

  }
  console.log(' \n');

}
/**
 * quit - exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log('Quitting now, goodbye!')
  process.exit();
}
/**
 * remove - removes last taks from list
 *
 */
function remove() {
  console.log('\nremoved task:"' + tasks.pop() + '"\n');
}

function removeByIndex(x) {
  if (x < 0 || x >= tasks.length || isNaN(x)) {
    console.log("\nindex not in array or you haven't entered a number\n");
  } else {
    console.log('removed task: "' + tasks.splice(x, 1) + '"\n');
  }
}
/**
 * edit - editing tasks values
 *
 */
function editModeByIndex(x) {
  console.log("\nedit mode\n");
  if (x <= tasks.length && x > 0) {
    mode = "edit";
    console.log("\nediting task: " + tasks[x - 1].name + "\n");
  } else {
    console.log("\nthat index is not within the number of tasks, number of tasks is: " + tasks.length)
  }
}

function editModeByEdit() {
  console.log("\nedit mode\n");
  if (tasks.length > 0) {
    mode = "edit";
    console.log("\nediting task: " + tasks[tasks.length - 1].name + "\n");
  }
}

function done(x) {
  tasks[x - 1].status = "done";
}

function undone(x) {
  tasks[x - 1].status = "undone";
}
/**
 * help - lists all possible inputs
 *
 */
function help() {
  console.log(
    '\nHere is a list of all possible commands: \n' +
    'hello - Simple Hello! \n' +
    'hello "yourname" - shows your name with the hello\n' +
    'quit - quits the application \nexit - exists the application  \n' +
    'add "task"- adds a task \n' +
    'list - lists tasks  \n' +
    'remove - removes the last task in the list \n' +
    'remove "index" - removes the task at that index \n' +
    'edit - enters edit mode\n' +
    'edit "index" - enters edit mode at that index\n' +
    'do "index" - changes a tasks status to done\n' +
    'undo "index" - changes a tasks status to undone\n');
}

// STARTING THE APPLICATION HERE!

let mode = "normal";
let tasks = new Array();
startApp("Chriss Haddad")
