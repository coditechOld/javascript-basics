let task_list_array = [];
const fs = require('fs');
let mode = 'normal';
let edit_index = null;

const runFunction = {
    hello
    , quit
    , 'exit': quit
    , add
    , list
    , remove
    , help
    ,
};
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
let waitingForData = false;

/**
 * onDataReceived - Decides what to do depending on the data that was received
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {

    if (mode === 'normal') {


        const args = [text,] = text.trim().split(' ');

        console.log('text:', text, 'is in runFunction:', text in runFunction)
        if (text in runFunction) {
            // text(task, args[1]);
            runFunction[text]([args[1], task_list_array]);

        }


        else if (text === 'remove') {
            remove([task_list_array, args[1]]);
        }
        else if (text === 'edit' && args[1]) {

            mode = "edit";
            edit_index = args[1];

        }
        else if (text === 'done' && args[1]) {
            done(task_list_array, args[1]);
            list(task_list_array);
        } else if (text === 'undone' && args[1]) {
            unDone(task_list_array, args[1]);
            list(task_list_array);
        }
        else if (text === 'save') {
            save(task_list_array, args[1]);
            list(task_list_array);
        } else if (text === 'load') {
            load(args[1]);
        }
        else {
            unknownCommand(text);
        }
    } else if (mode === 'edit') {

        edit(task_list_array, edit_index, text);

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
 * @param {string} person_name
 * @returns {string}
 */
function hello([person_name]) {
    if (!person_name) {
        console.log('hello!');

    } else {
        console.log('hello ' + person_name + '!');
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

    console.log("Base6 available command\n" +
        "*****************\n" +
        "hello: Says hello\n" +
        "hello X: Says hello X!\n" +
        "quit: exits the application\n" +
        "exit: exits the application\n" +
        "add: Adding a Task to the list\n" +
        "list: Displaying all the list\n" +
        "remove: Removing The last Tasks from the list\n" +
        "remove X: Removing The X Tasks from the list\n" +
        "done X: Mark a task X as Done\n" +
        "undone X:  Mark a task X as unDone\n" +
        "save  X:  Save the task Array as Json to a file X in data directory\n" +
        "load X :  Load the task Array from Json file X in data directory and change the value of the task array\n"
    )
    ;
}

/**
 * add  X- add task X to the list
 * @param {Array} task_array
 * @param {string} task_argument
 * @returns {void}
 * */
function add([task_argument, task_array]) {
    console.log("Adding Task to the list\n" +
        "*****************\n"
    );
    let taskJson = {
        'task': task_argument,
        'order': task_array.length,
        'done': false
    };
    task_array.push(taskJson);
}

/**
 * list - Listing all Tasks
 * @param {Array} task_array
 * @returns {void}
 * */
function list([, task_array]) {
    console.log("Listing all Tasks\n" +
        "*****************\n"
    );
    console.log(task_array);

}

/**
 * remove   - remove the last task from the list
 * @param { Array } task_list_array
 * @param { number } argument_to_be_removed
 * @returns {void}
 * */
function remove([argument_to_be_removed, task_list_array]) {

    if (!(argument_to_be_removed in task_list_array)) {
        argument_to_be_removed = isNaN(task_list_array.length) ? argument_to_be_removed = 0 : argument_to_be_removed = task_list_array.length - 1;

    }
    const obj = {
        left: task_list_array.slice(0, argument_to_be_removed),
        right: task_list_array.slice(argument_to_be_removed)
    };

    // let beforeArray = task_list_array.splice(0, argument_to_be_removed);
    // let afterArray = task_list_array.splice(1, task_list_array.length).map(function (order) {
    //
    // });
    // console.log(beforeArray);
    // console.log(afterArray);
    // task_list_array = [beforeArray, afterArray];
    // console.log(afterArray);
    console.log("removing task of order " + argument_to_be_removed);
    console.log( obj.left);
    console.log( obj.right);
    // task_list_array.splice(argument_to_be_removed, 1);
    /*
     for (let i = 0; i < task_list_array.length; i++) {
     if (task_list_array[i].order === argument_to_be_removed) {
     console.log("removing task of order " + argument_to_be_removed);

     }
     }*/


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


        for (let i = 0; i < task_list_array.length; i++) {

            if (task_array[i].order == edit_index_arg) {
                if (text_arg !== '\n') {
                    text_arg = text_arg.substring(0, text_arg.lastIndexOf("\n"));
                    console.log(edit_index_arg);
                    console.log("Editing task of order " + edit_index_arg + 'with ' + text_arg);
                    task_array[i].task = text_arg;
                    console.log(task_array[i].order);


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

            for (let i = 0; i < array_original.length; i++) {
                console.log("2");

                if (task_list_array[i].order == arg) {
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

            for (let i = 0; i < array_original.length; i++) {
                console.log("2");

                if (task_list_array[i].order == arg) {
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
        task_list_array = JSON.parse(content);
    }
    else {
        const content = fs.readFileSync("data/" + file);
        task_list_array = JSON.parse(content);
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
