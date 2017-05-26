'use strict';
var fs = require('fs');
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
      if (tasksList.length > 0) {
        var index = tasksList.length - 1;
        editModeByEdit();
      } else {
        console.log("\nyour task list is empty\n");
      }
    } else if (text == "save\n") {
      save();
    }else if (text == "load\n"){
      load();
    }
     else if (text.startsWith('do ') && (/\d+/.test(text.trim().slice(3, text.length - 1))) && text.endsWith("\n")) {
      if (tasksList.length > 0) {
        var index = parseInt(text.slice(3, text.length - 1));
        done(index);
        console.log("\ndid task " + index + " - " + tasksList[index - 1].name)
      } else {
        console.log("\nyour task list is empty\n");
      }

    } else if (text.startsWith('undo ') && (/\d+/.test(text.trim().slice(5, text.length - 1))) && text.endsWith("\n")) {
      if (tasksList.length > 0) {
        var index = parseInt(text.slice(5, text.length - 1));
        undone(index);
        console.log("\nundid task " + index + " - " + tasksList[index - 1].name)
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
      tasksList[index].name = text;
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
  tasksList.push(task);
  console.log('\nadded task: "' + x + '"\n');
}
/**
 * list - lists tasksList
 *
 * @returns {void}
 */
function list() {
  console.log("\nhere's the list of tasksList:")
  for (var i = 0; i < tasksList.length; i++) {
    console.log((i + 1) + " - " + tasksList[i].name + ", status: " + tasksList[i].status);

  }
  console.log(' \n');

}
/**
 * quit - exits the application
 *
 * @returns {void}
 */
function quit() {

  console.log('\nQuitting now, goodbye!')
  process.exit();

}
/**
 * remove - removes last taks from list
 *
 */
function remove() {
  console.log('\nremoved task:"' + tasksList.pop() + '"\n');
}

function removeByIndex(x) {
  if (x < 0 || x >= tasksList.length || isNaN(x)) {
    console.log("\nindex not in array or you haven't entered a number\n");
  } else {
    console.log('removed task: "' + tasksList.splice(x, 1) + '"\n');
  }
}
/**
 * edit - editing tasksList values
 *
 */
function editModeByIndex(x) {
  console.log("\nedit mode\n");
  if (x <= tasksList.length && x > 0) {
    mode = "edit";
    console.log("\nediting task: " + tasksList[x - 1].name + "\n");
  } else {
    console.log("\nthat index is not within the number of tasksList, number of tasksList is: " + tasksList.length)
  }
}

function editModeByEdit() {
  console.log("\nedit mode\n");
  if (tasksList.length > 0) {
    mode = "edit";
    console.log("\nediting task: " + tasksList[tasksList.length - 1].name + "\n");
  }
}

function done(x) {
  tasksList[x - 1].status = "done";
}

function undone(x) {
  tasksList[x - 1].status = "undone";
}

function save() {
  if(!process.argv[2]){
    saveFile('file.json');
  }
  else{
    saveFile(process.argv[2]);
  }
}
function saveFile(name){
  console.log('saving to',name)
  if (tasksList.length > 0) {
    var str = JSON.stringify(tasksList);
    fs.writeFile(name, str, {
      encoding: 'utf8'
    }, function(err) {
      if (err) {
        console.error('there was an error: ', err);
        return;
      } else {
        console.log('all good, thanks\n')
      }
    });
    console.log('\ndata was appended to file\n');
  } else {
    console.log("\nyour console is empty\n")
  }
}
function load(){
  const saveName = (process.argv[2]||'file.json')

  if(!process.argv[2]){
    loadFile('file.json');
  }
  else{
    loadFile(process.argv[2]);
  }
}
function loadFile(name){
  console.log("\nfile is loaded\n")
  fs.readFile(name, 'utf8', function (err, data) {
  if (err) throw err;
  tasksList = JSON.parse(data);
});
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
    'list - lists tasksList  \n' +
    'remove - removes the last task in the list \n' +
    'remove "index" - removes the task at that index \n' +
    'edit - enters edit mode\n' +
    'edit "index" - enters edit mode at that index\n' +
    'do "index" - changes a tasksList status to done\n' +
    'undo "index" - changes a tasksList status to undone\n'+
  'save - saves the tasksList in a file\n');
}

// STARTING THE APPLICATION HERE!

let mode = "normal";
let tasksList = new Array();



startApp("Chriss Haddad")
