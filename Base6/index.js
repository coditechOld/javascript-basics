var list = [];
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


/**
 * onDataReceived - Decides what to do depending on the data that was received
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {

    const array = text.split(' ');
    console.log(array);

    text = array[0];
    console.log(array[1]);
    var arg1 = '';
    if (array[1]) {
        arg1 = array[1].replace(/\n$/, "");
    }
    console.log(arg1);
    if (text === 'quit\n' || text === 'exit\n') {
        quit();
    }
    else if (text === 'hello\n' || text === 'hello') {
        hello(arg1);
    } else if (text === 'help\n') {
        help();
    } else if (text === 'add' && arg1 !== '' && arg1 !== null && arg1 !== undefined) {
        add(arg1);
    } else if (text === 'help\n') {
        help();
    } else if (text === 'list\n') {
        lists();
    } else if (text === 'remove\n') {
        remove();
    }
    else {
        unknownCommand(text);
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
 * @returns {void}
 */
function hello(hello) {
    if (!hello) {
        console.log('hello!')

    } else {
        console.log('hello ' + hello + '!')
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
 * @returns {void}
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
        "remove: Removing The last Tasks from the list\n"
    );

}

/**
 * add  X- add task X to the list
 * @returns {void}
 * */
function add(task) {
    console.log("Addink Task to the list\n" +
        "*****************\n"
    );
    list.unshift(task);
    console.log(list);

}

/**
 * list - Listing all Tasks
 * @returns {void}
 * */
function lists() {
    console.log("Listing all Tasks\n" +
        "*****************\n"
    );
    console.log(list);

}
/**
 * remove  - remove the last task from the list
 * @returns {void}
 * */
function remove() {
    console.log("Removing The last Tasks from the list\n" +
        "*****************\n"
    );
    list.pop();
    console.log(list);

}


// STARTING THE APPLICATION HERE!
startApp("Gaby Karam")
