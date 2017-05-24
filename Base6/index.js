
/**
 * startApp - Starts the applucation
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log("Welcome to "+name+"'s application!");
  console.log("--------------------");
}


/**
 * onDataReceived - Decides what to do depending on the data that was received
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n'|| text==='exit\n') {
    quit();
  }
  else if(text === 'hello\n'){
    hello();
  }
  else if(text === 'help\n'){
  help();
  }
  else if (text.startsWith('hello ')&& text.endsWith("\n")) {
  helloSomeone(text.slice(6,text.length-1));
  }
  else{
    unknownCommand(text);
  }
}


/**
 * unknownCommand - Runs when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * hello - Says hello
 *
 * @returns {void}
 */
function hello(){
  console.log('hello!')
}
function helloSomeone(x){
  console.log('hello '+x+"!");
}


/**
 * quit - exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}
/**
* help - lists all possible inputs
*
*/
function help(){
  console.log(
  '\nHere is a list of all possible commands: \n'+
  'hello - Simple Hello! \n'+
  'hello "yourname" - shows your name with the hello\n'+
  'quit - quits the application \nexit - exists the application  ');
}

// STARTING THE APPLICATION HERE!
startApp("Chriss Haddad")
