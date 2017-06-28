let task_list_array = [];
const fs = require('fs');
let mode = 'normal';
let edit_index = null;

// require
const commandsWithReturns = {

    add
    , remove
    , load
    , done
    , unDone
};
const commandsWithoutReturn = {
    hello
    , quit
    , 'exit': quit
    , help
    , save


};

const commandsWithoutReturnAndWithArrayParam = {
    list
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
    console.log("Welcome to " + name + "'s application!");
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
    const args = [text,] = text.trim().split(' ');
    if (mode === 'normal') {


        console.log('text:', text, 'is in commands:', text in commandsWithReturns || text in commandsWithoutReturn);
        if (text in commandsWithReturns) {
            // text(task, args[1]);
            task_list_array = commandsWithReturns[text](args[1], task_list_array);

        } else if (text in commandsWithoutReturn) {
            // text(task, args[1]);
            commandsWithoutReturn[text](args[1], task_list_array);

        }
        else if (text in commandsWithoutReturnAndWithArrayParam) {
            // text(task, args[1]);
            commandsWithoutReturnAndWithArrayParam[text](task_list_array);

        }

        else if (text === 'remove') {
            // remove([task_list_array, args[1]]);
        }
        else if (text === 'edit') {

            if (args[1]) {
                mode = "edit";
                edit_index = args[1];
            } else {
                console.log('Please Try again you need to enter the index of task')
            }
        }
        else if (text === 'done' && args[1]) {
            done(task_list_array, args[1]);
            list(task_list_array);
        } else if (text === 'undone' && args[1]) {
            unDone(task_list_array, args[1]);
            list(task_list_array);
        }
        else if (text === 'save') {
            save(task, args[1]);
            list(task_list_array);
        } else if (text === 'load') {
            load(args[1]);
        }
        else {
            unknownCommand(text);
        }
    } else if (mode === 'edit') {

        task_list_array = edit(args[0], task_list_array, edit_index);
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
function hello(person_name) {
    console.log((!person_name ? 'Hello !' : 'Hello ' + person_name + ' !'));
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
 * list - Listing all Tasks
 * @param {Array} task_array
 * @returns {Array}
 * */
function list(task_array) {
    console.log("Listing all Tasks\n" +
        "*****************\n"
    );

    console.log(task_array);

}

/**
 * add  X- add task X to the list
 * @param {Array} task_array
 * @param {string} task_argument
 * @returns {Array}
 * */
function add(task_argument, task_array) {
    const argument = task_argument;
    const array = task_array;
    console.log("Adding Task to the list\n" +
        "*****************\n"
    );
    let taskJson = {
        'task': argument,
        'order': array.length,
        'done': false
    };
    array.push(taskJson);

    return array;
}

/**
 * remove   - remove the last task from the list
 * @param { Array } task_list_array
 * @param { number } argument_to_be_removed
 * @returns {Array}
 * */
function remove(argument_to_be_removed, task_list_array) {

    let index = argument_to_be_removed;
    const originalArray = task_list_array;
    let array = [];
    if (index < 0 || index >= originalArray.length || index === undefined) {
        index = originalArray.length - 1;
    }
    console.log("removing task of order " + index);


    const task_left = originalArray.slice(0, index);
    const task_right = originalArray.slice(index + 1).map(function (data, index) {
        console.log(index);
        data.order--;
        return data
    });

    array = array.concat(task_left, task_right);
    return array;

}


/**
 * edit  - remove the last task from the list
 *      take 1 attribute that is the index of the item to be edited
 * @param {Array} task_array
 * @param {Number} edit_index_arg
 * @param {String} text_arg
 * @returns {Array}
 * */
function edit(text_arg, task_array, edit_index_arg) {

    console.log("still editing");

    const argument = text_arg;
    const array = task_array;
    let index = edit_index_arg;

    index = (index > 0 && array.length - 1 > index) ? index : array.length - 1;


    if (text_arg !== '') {

        console.log(edit_index_arg);
        console.log("Editing task of order " + index + 'with ' + argument);
        array[index].task = argument;


    }
    else {
        console.log('Quiting without change');
    }

    return task_array;


}

/**
 * done  - mark a task as done by adding it  to the done array
 *      take 1 attribute that is the index the need to be added to the done
 *
 * @param {Array} array_original
 * @param {any} arg
 * @returns {Array}
 * */
function done(arg, array_original) {
    const arrayReturn = array_original;
    const index = (arg > 0 && arrayReturn.length - 1 > arg) ? arg : -1;


    if (index !== -1) {

        arrayReturn[arg].done = true;

    }
    else {
        console.log('parameter Supported index' + arg + ' is not available in the array.')

    }

    return arrayReturn;
}

/**
 * unDone  - mark a task as unDone by adding it  to the undone array
 *      take 1 attribute that is the index the need to be added and removed
 * @returns {Array}
 * */
function unDone(arg, array_original) {

    const arrayReturn = array_original;


    if (arg < arrayReturn.length && arg >= 0) {


        arrayReturn[arg].done = false;

    } else {
        console.log('parameter Supported index' + arg + ' is not available in the array.')

    }
    return arrayReturn;
}


/**
 * save  - save task array to json file
 *      take 1 attribute that is the data the need to be saved
 *      @param { Array } data
 *      @param { String } file
 * @returns {void}
 * */
function save(file, data) {

    if (file === undefined) {
        const string = JSON.stringify(data, null, '\t');
        fs.writeFile('./data/task.json', string, function (err) {
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

}


/**
 * save  - save task array to json file
 *      take 1 attribute that is the data the need to be saved
 *      @param { String } file
 * @returns {any}
 * */
function load(file) {

    let task_list_array;
    if (file === undefined) {
        const content = fs.readFileSync("data/task.json");
        task_list_array = JSON.parse(content);
    }
    else {
        const content = fs.readFileSync("data/" + file);
        task_list_array = JSON.parse(content);
    }

    return task_list_array;
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
