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

    const original = text;
    if (mode === 'normal') {
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
        }


        else if (text === 'add' && args[1]) {
            console.log("Adding Task to the list\n" +
                "*****************\n"
            );
            add(task, args[1]);
            console.log(task);
        }

        else if (text === 'list') {
            lists(task);
        }

        else if (text === 'remove' && args[1]) {
            remove(task, args[1]);
        }

        else if (text === 'remove') {
            remove(task);
        }

        else if (text === 'edit' && args[1]) {

            mode = "edit";
            edit_index = args[1];

        }
        else if (text === 'done' && args[1]) {
            done(task, args[1]);
            lists(task);
        } else if (text === 'undone' && args[1]) {
            unDone(task, args[1]);
            lists(task);
        }
        else if (text === 'save') {
            save(task, args[1]);
            lists(task);
        } else if (text === 'load') {
            load(args[1]);
        }
        else {
            unknownCommand(original);
        }
    } else if (mode === 'edit') {

        task = edit(task, edit_index, text);

        console.log('edit');
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
 * @param {string} hello
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

    return "Base6 available command\n" +
        "*****************\n" +
        "hello: Says hello\n" +
        "hello X: Says hello X!\n" +
        "quit: exits the application\n" +
        "exit: exits the application\n" +
        "add: Adding a Task to the list\n" +
        "list: Displaying all the list\n" +
        "remove: Removing The last Tasks from the list\n";
}

/**
 * add  X- add task X to the list
 * @param {Array} task_array
 * @param {string} task_argument
 * @returns {Array}
 * */
function add(task_array, task_argument) {

    var taskJson = {
        'task': task_argument,
        'order': task.length,
        'done': false
    };
    task_array.push(taskJson);
    return task_array;

}

/**
 * list - Listing all Tasks
 * @param {Array} tasks
 * @returns {void}
 * */
function lists(tasks) {
    console.log("Listing all Tasks\n" +
        "*****************\n"
    );

    function compare(a, b) {
        if (a.order < b.order)
            return -1;
        if (a.order > b.order)
            return 1;
        return 0;
    }

    tasks.sort(compare);

    console.log(tasks);

}

/**
 * remove   - remove the last task from the list
 * @returns {int}
 * */
function remove(task_array, args) {
    if (task_array.length !== 0) {

        if (parameterCheck(args)) {
            if (/^\d+$/.test(args)) {


                if (args < task_array.length && args >= 0) {
                    console.log("removing task of order " + args);

                    for (var i = 0; i < task_array.length; i++) {
                        if (task_array[i].order == args) {
                            console.log("removing task of order " + args);

                            for (var j = 0; j < task_array.length; j++) {
                                if (task_array[j].order > task_array[i].order) {
                                    task_array[j].order--;
                                }
                            }

                            task_array.splice(i, 1);
                        }
                    }
                    // task_array.splice(args, 1);
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

            var i = task_array.length - 1;
            for (var j = 0; j < task_array.length; j++) {
                if (task_array[j].order > task_array[i].order) {
                    task_array[j].order--;
                }
            }

            task_array.splice(i, 1);

            console.log(task);
            console.log(i);
            return 0;

        }
    } else {
        console.log("array is empty");
    }

}


/**
 * edit  - remove the last task from the list
 *      take 1 attribute that is the index of the item to be edited
 * @param {Array} task_array
 * @param {Number} edit_index_arg
 * @param {String} text_arg
 * @returns {Array}
 * */
function edit(task_array, edit_index_arg, text_arg) {

    console.log("still editing");
    if ((task_array.length - 1 >= edit_index_arg) && (edit_index_arg >= 0)) {


        for (var i = 0; i < task.length; i++) {

            if (task_array[i].order == edit_index_arg) {
                if (text_arg !== '\n') {
                    text_arg = text_arg.substring(0, text_arg.lastIndexOf("\n"));
                    console.log(edit_index_arg);
                    console.log("Editing task of order " + edit_index_arg + 'with ' + text_arg);
                    task_array[i].task = text_arg;
                    console.log(task_array[i].order);


                    return task_array;
                }
                else {
                    console.log('Quiting without change');
                }

                break;

            }

        }
    } else {
        console.log('index is not in the task list');
    }

    return task_array;

}

/**
 * done  - mark a task as done by adding it  to the done array
 *      take 1 attribute that is the index the need to be added to the done
 *
 * @param {Array} array_original
 * @param {Number} arg
 * @returns {void}
 * */
function done(array_original, arg) {
    if (/^\d+$/.test(arg)) {
        console.log("2");
        if (arg < array_original.length && arg >= 0) {
            console.log("2");

            for (var i = 0; i < array_original.length; i++) {
                console.log("2");

                if (task[i].order == arg) {
                    console.log("22");

                    array_original[i].done = true;

                }
            }


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
function unDone(array_original, arg) {
    if (/^\d+$/.test(arg)) {
        console.log("2");
        if (arg < array_original.length && arg >= 0) {
            console.log("2");

            for (var i = 0; i < array_original.length; i++) {
                console.log("2");

                if (task[i].order == arg) {
                    console.log("22");

                    array_original[i].done = false;

                }
            }


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
 *      @param { any } data
 *      @param { String } file
 * @returns {void}
 * */
function save(data, file) {


    if (file === undefined) {
        const string = JSON.stringify(data, null, '\t');
        fs.writeFile('./data/task.json' + file, string, function (err) {
            if (err) return console.error(err);
            console.log('done');
        });
    }
    else {
        const string = JSON.stringify(data, null, '\t');
        fs.writeFile('./data/' + file, string, function (err) {
            if (err) return console.error(err);
            console.log('done');
        });
    }


    /* if (fs.existsSync('./data/data.json')) {
     fs.writeFile("./data/data.json", "Hey there!", function (err) {
     if (err) {
     return console.log(err);
     }

     console.log("The file was saved!");
     });
     }*/

}


/**
 * save  - save task array to json file
 *      take 1 attribute that is the data the need to be saved
 *      @param { String } file
 * @returns {void}
 * */
function load(file) {

    if (file === undefined) {
        const content = fs.readFileSync("data/task.json");
        task = JSON.parse(content);
    }
    else {
        const content = fs.readFileSync("data/" + file);
        task = JSON.parse(content);
    }
}


/**
 * parameterCheck  - check if parameter is undefined or empty string
 * @param {any} param
 * @returns {boolean}
 * */
function parameterCheck(param) {
    return ( param !== undefined && param !== '');
}

// STARTING THE APPLICATION HERE!
startApp('Gaby Karam');
