/**
 * Created by gabykaram on 6/28/17.
 */

(function (global, factory) {


    if (typeof exports !== 'undefined') {
        // var x = require('matrices.js');
        module.exports = factory();
    } else if (typeof define !== 'undefined') {

        return define([], factory)
    }
    else {
        /* if (!global.matrixOperations) {
         throw new Error('module matrixOperations is needed!')
         }*/
        global.taskLib = factory();
    }
})(this,
    function () {


        /**
         * add  X- add task X to the list
         * @param {Array} task_array
         * @param {string} task_argument
         * @returns {Array}
         * */
        function add(task_argument, task_array) {
            const argument = task_argument;
            const array = task_array;
            console.log("Adding Item to the list\n" +
                "*****************\n"
            );
            array.push({
                'task': argument,
                'order': array.length,
                'done': false
            });

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
            const task_right = originalArray.slice(parseInt(index) + 1).map(function (data, index) {
                console.log(index);
                data.order--;
                return data;

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

            let index = arg;
            const arrayReturn = array_original;
            let array = [];
            if (index < 0 || index >= arrayReturn.length || index === undefined) {
                index = -1;
            }
            if (index !== -1) {

                arrayReturn[arg].done = true;
                const originalOrder = arrayReturn[arg].order;

                arrayReturn.map((item, index) => {

                    if (item.order > originalOrder && !item.done) {
                        arrayReturn[arg].order = item.order;
                        item.order--;
                    }
                    return item.order;
                });
                // arrayReturn[arg].order = arrayReturn.length - 1;
            }
            else {
                console.log('parameter Supported index' + arg + ' is not available in the array.');
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

                const originalOrder = arrayReturn[arg].order;

                arrayReturn[arg].done = false;
                var small = arrayReturn[arg].order;
                arrayReturn.map((item, index) => {
                    console.log('order = ' + item.order);


                    if (item.order < originalOrder && item.done) {
                        arrayReturn[arg].order = item.order < arrayReturn[arg].order ? item.order : arrayReturn[arg].order;
                        item.order++;
                    }
                    console.log('order = ' + item.order);
                    return item.order;
                });
            } else {
                console.log('parameter Supported index' + arg + ' is not available in the array.')

            }
            return arrayReturn;
        }


        /**
         * hello - Says hello
         * hello X - Says hello X
         * @param {string} person_name
         * @returns {string}
         */
        function hello(_, person_name) {
            return (!person_name ? 'Hello !' : 'Hello ' + person_name + ' !');
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
                "remove: Removing The last Tasks from the list\n" +
                "remove X: Removing The X Tasks from the list\n" +
                "done X: Mark a task X as Done\n" +
                "undone X:  Mark a task X as unDone\n" +
                "save  X:  Save the task Array as Json to a file X in data directory\n" +
                "load X :  Load the task Array from Json file X in data directory and change the value of the task array\n"

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

            return task_array;

        }

        return {
            add
            , remove
            , edit
            , done
            , unDone
            , hello
            , help
            , list
        };
    });


