const undone = [];
var task = [];
const doneArray = [];
const parse = require('shell-quote').parse;
const cp = require('child_process');
const fs = require('fs');
var mode = 'normal';
var edit_index = null;
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
    console.log("Welcome to " + name + "'s application!")
    console.log("--------------------")
}
var waitingForData = false;

/**
 * onDataReceived - Decides what to do depending on the data that was received
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {

    if (mode == 'normal') {
        var args = parse(text);
        console.log(args);
        text = args[0];

        if (text === 'quit' || text === 'exit') {
            quit();
        }
        else if (text === 'hello' && args[1]) {
            console.log(hello(args[1]));
        } else if (text === 'hello') {
            console.log(hello());
        } else if (text === 'help') {
            console.log(help());
        } else if (text === 'add' && args[1]) {
            console.log("Adding Task to the list\n" +
                "*****************\n"
            );
            const newArray = add(task, args[1]);
            task.length = 0;
            task = newArray;
            console.log(task);
        } else if (text === 'list') {
            lists(task);
        } else if (text === 'remove' && args[1]) {
            remove(task, args[1]);
        } else if (text === 'remove') {
            remove(task);
        } else if (text === 'edit' && args[1]) {

            mode = 'edit';
            edit_index = args[1];

        } else if (text === 'done' && args[1]) {
            done(task, doneArray, args[1]);
            lists(doneArray);
        }
        else {
            unknownCommand(text);
        }
    } else if (mode == 'edit') {
        console.log(task[edit_index]);
        console.log(edit_index);
        if (text !== '\n') {
            task[edit_index] = text.substr(0, -1);
            console.log(task[edit_index]);
        }

        mode = "normal";
    }
}


/**
 * unknownCommand - Runs when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
    console.log('unknown command: "' + c.trim() + '"')
}


/**
 * hello - Says hello
 * hello X - Says hello X
 *
 * @returns {string}
 */
function hello(hello) {
    if (!hello) {
        return 'hello!';

    } else {
        return 'hello ' + hello + '!';
    }
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
 * help - display lists of all the possible commands
 * @returns {string}
 * */
function help() {

    const string = "Base6 available command\n" +
        "*****************\n" +
        "hello: Says hello\n" +
        "hello X: Says hello X!\n" +
        "quit: exits the application\n" +
        "exit: exits the application\n" +
        "add: Adding a Task to the list\n" +
        "list: Displaying all the list\n" +
        "remove: Removing The last Tasks from the list\n";

    return string;
}

/**
 * add  X- add task X to the list
 * @returns {Array}
 * */
function add(task_array, task_argument) {
    const task_variable = cloneData(task_array)
    task_variable.unshift(task_argument);

    return task_variable;

}

/**
 * list - Listing all Tasks
 * @returns {void}
 * */
function lists(tasks) {
    console.log("Listing all Tasks\n" +
        "*****************\n"
    );
    console.log(tasks);

}

/**
 * remove  - remove the last task from the list
 * @returns {int}
 * */
function remove(task_array, args) {
    if (parameterCheck(args)) {
        if (/^\d+$/.test(args)) {


            if (args < task_array.length && args >= 0) {
                task_array.splice(args, 1);
                return 0;
            } else {
                console.log("index supported is not in the list");
                return 1;
            }
        }
        else {
            console.log('argument supported ' + args + ' is not a number!')
            return 2;

        }
    }
    else {
        console.log("Removing The last Tasks from the list\n" +
            "*****************\n"
        );

        task.pop();
        console.log(task);
        return 0;

    }

}


/**
 * edit  - remove the last task from the list
 *      take 1 attribute that is the index of the item to be edited
 * @returns {int}
 * */
function edit(task_array, args_1, args_2) {
    if (parameterCheckNum(args_1)) {

        if (/^\d+$/.test(args_1)) {
            if (args_1 < task_array.length && args_1 >= 0) {
                if (parameterCheck(args_2)) {
                    task_array[args_1] = args_2;

                }

            }
        }
        else {
            console.log('argument supported ' + args_1 + ' is not a number!')

        }
    }
    else {

        console.log("List has not been edited");
        console.log(task_array);
    }

}

/**
 * done  - mark a task as done by adding it  to the done array
 *      take 1 attribute that is the index the need to be added to the done
 * @returns {void}
 * */
function done(array_original, array_toCopy, arg) {
    if (/^\d+$/.test(arg)) {
        if (arg < array_original.length && arg >= 0) {
            array_toCopy[array_toCopy.length] = array_original[arg];
            array_original.splice(arg, 1);


        } else {
            console.log('parameter Supported index' + arg + ' is not available in the array.')

        }
    } else {
        console.log('parameter Supported ' + arg + ' is not a number')
    }
}

/**
 * unDone  - mark a task as unDone by adding it  to the undone array
 *      take 1 attribute that is the index the need to be added and removed
 * @returns {void}
 * */
function unDone(arg) {
    if (/^\d+$/.test(arg)) {
        if (arg < task.length && arg >= 0) {
            // done[done.length] = done()[arg];

            task.splice(arg, 1);


        } else {
            console.log('parameter Supported index' + arg + ' is not available in the array.')

        }
    } else {
        console.log('parameter Supported ' + arg + ' is not a number')
    }
}


/**
 * save  - save task array to json file
 *      take 1 attribute that is the data the need to be saved
 * @returns {void}
 * */
function save(data) {
    const string = JSON.stringify(data, null, '\t');
    fs.writeFile('./data/task.json', string, function (err) {
        if (err) return console.error(err);
        console.log('done');
    });


    /* if (fs.existsSync('./data/data.json')) {
     fs.writeFile("./data/data.json", "Hey there!", function (err) {
     if (err) {
     return console.log(err);
     }

     console.log("The file was saved!");
     });
     }*/

}
function parameterCheckNum(param) {
    return (typeof param === 'string');
}

function parameterCheck(param) {
    return ( param !== undefined && param !== '');
}

// Use the JSON parse to clone the data.
function cloneData(data) {
    // Convert the data into a string first
    var jsonString = JSON.stringify(data);

    //  Parse the string to create a new instance of the data
    return JSON.parse(jsonString);
}

// STARTING THE APPLICATION HERE!
startApp('Gaby Karam');
