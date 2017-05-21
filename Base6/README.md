# Javascript - Base 6 - Building applications

Goal: create an app that allows to enter skills

## Step 1: Testing the software

1. Run the file with `node index.js`
2. Try entering "hello", then try "quit"

## Step 2: Little steps

*note*: Each of these steps is a **commit**

1. Change the name of the app from "Jad Sarout" to your own
2. Allow people to quit the app by typing "exit" OR "quit"
3. Add a new command, "help", that lists all the possible commands
4. Document this function like the others

## Step 3: String manipulation

*note*: Each of these is **still** a commit

1. Make the "hello" command able to take an argument. That is, if I write "hello x", the answer should be "hello x!"
2. Make it so if I write "hello" without anything, I still get "hello!"
3. Don't forget to update the "help" command accordingly

## Step 4: Additional commands

*note*:Yep. Commits

1. Make an "add" command that allows to add a task. Store the task in a list (array)
2. Make a "list" command to list all tasks
3. Make a "remove" command that allows to remove the last task

## Step 5: Refinements

*note*: commits. Each step is a commit.

1. Make the "remove" command able to remove a task by number (e.g, "remove 3" to remove the third task)
2. Make the "remove" command tell you if you enter a number that does not exist
3. Make an "edit" command that allows to edit the last task
4. Allow "edit" to take a number to edit a specific task
5. Allow "edit" to be cancelled (if a user doesn't write anything, the task does not change)
6. Allow a "done" and "undone" feature

## Step 6: Persistent data!

*commits*

1. Save the data to disk (you will need "fs", and probably "JSON.stringify")
2. Load the data from disk (also "fs", and probably "JSON.parse")
3. Allow the save file to be configured (look into "process.argv")

## Congrats!
