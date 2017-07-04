var fs = require('fs');


/**
 * startApp - Starts the applucation
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */

var Tasklist =[];

function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log("Welcome to "+name+"'s application!")
  console.log("--------------------")
  
}


/**
 * onDataReceived - Decides what to do depending on the data that was received
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  var input = text.replace("\n","").split(' ')
  var firstPart = input[0];
  var secondPart = input[1];
  var thirdPart = input[2];
  //console.log("-------\n"+firstPart+"SSSSSSS\n--------")
  if (firstPart === 'quit'|| firstPart === 'exit') {
    quit();
  }
  else if(firstPart === 'hello'){
    hello(secondPart);
  }
  else if(firstPart === 'help') { 
    help();

  }
  else if(firstPart === 'add')
  {  add(secondPart,thirdPart)

  }
  else if(firstPart === 'list'){
    console.log(Tasklist)
  }
  else if (firstPart === 'remove'){
    remove(secondPart);
  }
  else if (firstPart === 'edit'){
     edit(secondPart,thirdPart);

  }
  else if (firstPart === 'save'){
    save(secondPart);
  }
  else if (firstPart === 'load'){
    load(secondPart)
  }
  else if (firstPart === 'config'){
    config(secondPart,thirdPart)
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
function hello(x){
  if(x){
  console.log('hello '+x.trim()+' !');}
  else{
    console.log('hello!');
  }
}
/**
 * help -  lists all the possible commands
 *
 * @returns {void}
 */
function help(){
console.log('hello\nquit or exit\nhelp\n')
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
 * add - allows to add a task
 *
 * @returns {void}
 */
function add(secondPart,thirdPart){
  var text = {task:secondPart,status:thirdPart } 
  console.log(text)
  Tasklist.push(text)
  console.log(Tasklist)
}
/**
 * remove - allows to remove the last task 
 *
 * @returns {void}
 */
function remove(x){
  if (x<Tasklist.length){
  Tasklist.splice(x,1);
   console.log(Tasklist)}
   else {
     console.log('Number Does Not Exist')
   }
}

function isUndefined(x){
  return ( typeof x == 'undefined')
}

/**
 * edit - allows to edit the last task 
 *
 * @returns {void}
 */
function edit(x,y){
  x1 = isUndefined(x);
  x2 = isUndefined(y);
  if(x === x1 || y === x2){
console.log('Please Enter Values !!')
console.log('Array Unchanged'+ Tasklist)}
else {
  Tasklist.splice(x,1,y)
console.log(Tasklist)}
}

function save(){
  var json = JSON.stringify(Tasklist);
  console.log("::::::SAVE:::::",json)
  fs.writeFile('Base6.json', json, 'utf8', function writeFileCallback(err, data){
    if (err){
      console.log(err);
    }
  })
}

function load(){
  fs.readFile('Base6.json', 'utf8', function readFileCallback(err, data){
    if (err){
      console.log(err);
    } else {
      console.log("::::LOAD::::",data)
      Tasklist = JSON.parse(data); //now it an object
    }
  })
}

function config(secondPart,thirdPart){
  var config1 = process.argv[secondPart]=thirdPart
  console.log(Tasklist)

}




// STARTING THE APPLICATION HERE!
startApp("Selim Richa")
