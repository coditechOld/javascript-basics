let task_list_array = [];
const common = require('./function');
const fs = require('fs');
let mode = 'normal';
let edit_index = null;

// require
const commandsWithReturns = {

    add: common.add
    , remove: common.remove
    , load
    , done: common.done
    , unDone: common.unDone


};

const commandsWithConsole = {
    list: common.list
    , hello: common.hello
    , help: common.help


};
const commandsWithoutReturn = {
    'exit': quit
    , save


}
;

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
            task_list_array = commandsWithReturns[text](args[1], task_list_array);

        } else if (text in commandsWithConsole) {
            console.log(commandsWithConsole[text](task_list_array, args[1]));


        } else if (text in commandsWithoutReturn) {
            // text(task, args[1]);
            commandsWithoutReturn[text](args[1], task_list_array);

        }



        else if (text === 'edit') {

            if (args[1]) {
                mode = "edit";
                edit_index = args[1];
            } else {
                console.log('Please Try again you need to enter the index of task')
            }
        }

        else if (text === 'save') {
            save(task, args[1]);
        } else if (text === 'load') {
            load(args[1]);
        }
        else {
            unknownCommand(text);
        }
    } else if (mode === 'edit') {

        task_list_array = common.edit(args[0], task_list_array, edit_index);
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
 * quit - exits the application
 *
 * @returns {void}
 */
function quit() {
    console.log('Quitting now, goodbye!')
    process.exit();
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


var content;
// First I want to read the file
fs.readFile('./Index.html', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;

    // Invoke the next step here however you like
    console.log(content);   // Put all of the code here (not the best solution)

});

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


// STARTING THE APPLICATION HERE!
startApp('Gaby Karam');
