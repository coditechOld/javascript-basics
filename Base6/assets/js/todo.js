const loadTaskToView = function (task_list) {

    const task = task_list.slice();
    const taskForSecondLoop = task_list.slice();
    task.sort(function (a, b) {
        return a.order - b.order;
        // return a.order < b.order ? -1 : 1;
    });
    console.log(task);
    const doneTaskUl = document.querySelector('.doneTask');
    const undoneTaskUl = document.querySelector('.list-output-ul');
    doneTaskUl.innerHTML = '';
    undoneTaskUl.innerHTML = '';
    for (var i = 0; i < task.length; i++) {
        for (var y = 0; y < taskForSecondLoop.length; y++) {
            if (taskForSecondLoop[y].order === task[i].order) {

                if (task[i].done) {

                    const newLi = document.createElement("li");
                    newLi.className = 'task task-done';
                    newLi.setAttribute('data-id', ( taskForSecondLoop.indexOf(task[i])).toString());

                    const buttonDone = document.createElement('button');
                    buttonDone.className = 'task-mark-undone action-done';
                    buttonDone.setAttribute('data-id', i.toString());


                    const iconDone = document.createElement('i');
                    iconDone.className = 'fa  fa-check-square-o action-done task-mark-done';
                    const textSpan = document.createElement('span');
                    textSpan.className = 'task-info';

                    const text = document.createTextNode(task[i].task);
                    textSpan.appendChild(text);


                    const buttonUndone = document.createElement('button');
                    buttonUndone.className = 'task-mark-remove pull-right action-close';
                    buttonUndone.setAttribute('data-id', '4');

                    const iconUndone = document.createElement('i');
                    iconUndone.className = 'fa fa-times action-close';

                    buttonDone.appendChild(iconDone);
                    buttonUndone.appendChild(iconUndone);

                    newLi.appendChild(buttonDone);
                    newLi.appendChild(textSpan);

                    newLi.appendChild(buttonUndone);

                    if (doneTaskUl.hasChildNodes()) {
                        doneTaskUl.insertBefore(newLi, doneTaskUl.childNodes[0]);
                    }
                    else {
                        doneTaskUl.appendChild(newLi);

                    }

                }
                else {

                    const newLi = document.createElement("li");
                    newLi.className = 'task';
                    newLi.setAttribute('data-id', ( taskForSecondLoop.indexOf(task[i])).toString());

                    const buttonDone = document.createElement('button');
                    buttonDone.className = 'task-mark-undone action-undone';
                    buttonDone.setAttribute('data-id', i.toString());


                    const iconDone = document.createElement('i');
                    iconDone.className = 'fa fa-square-o action-undone';
                    const textSpan = document.createElement('span');
                    textSpan.className = 'task-info';

                    const text = document.createTextNode(task[i].task);
                    textSpan.appendChild(text);


                    const buttonUndone = document.createElement('button');
                    buttonUndone.className = 'task-mark-remove pull-right action-close';
                    buttonUndone.setAttribute('data-id', '4');

                    const iconUndone = document.createElement('i');
                    iconUndone.className = 'fa fa-times action-close';

                    buttonDone.appendChild(iconDone);
                    buttonUndone.appendChild(iconUndone);

                    newLi.appendChild(buttonDone);
                    newLi.appendChild(textSpan);

                    newLi.appendChild(buttonUndone);

                    undoneTaskUl.appendChild(newLi)
                }
                break;
            }


        }


    }

};

function closest(el, selector) {



    // traverse parents
    while (el) {
        var parent = el.parentNode;
        if (parent && parent.tagName.toLowerCase() === selector) {
            return parent;
        }
        el = parent;
    }

    return undefined;
}
let task_list = [];
function findUpClass(el, tag) {
    if (el !== undefined) {

        if (el.classList !== undefined) {
            for (var i = 0; i < el.classList.length; i++) {
                if (el.classList[i] === tag) {
                    return el;

                }
            }
        }
    }
    return undefined;
}
function findUpId(el, tag) {
    if (el != undefined) {

        if (el.classList !== undefined) {

            if (el.id === tag) {
                return el;
            }


        }
    }

    return undefined;

}
const removeTaskFromView = function (element) {


    const select_ulList = closest(element, 'ul');
    const select_li = closest(element, 'li');
    const task_index = parseInt(select_li.getAttribute('data-id'));

    task_list = taskLib.remove(task_index, task_list);
    select_ulList.removeChild(select_li);
};
const undoneIconEventFunction = function (_this) {

    const list = closest(_this, 'li');

    const element = document.querySelector('#doneTask');

    task_list = taskLib.done(parseInt(list.getAttribute('data-id')), task_list);
    if (element.hasChildNodes()) {
        element.insertBefore(list, element.childNodes[0]);
    }
    else {
        element.appendChild(list);

    }
    list.querySelector('.task-mark-undone i').classList.add('action-done');
    list.querySelector('.task-mark-undone i').classList.add('fa-check-square-o');
    list.querySelector('.task-mark-undone i').classList.remove('action-undone');
    list.querySelector('.task-mark-undone i').classList.remove('fa-square-o');
    list.querySelector('.task-mark-undone').classList.add('action-done');
    list.querySelector('.task-mark-undone').classList.remove('action-undone');
    list.classList.add('task-done');
    _this.classList.add('task-mark-done');
    /*
     var el = document.getElementById('thingy'),
     elChild = document.createElement('div');
     elChild.innerHTML = 'Content';

     // Prepend it
     el.insertBefore(elChild, el.firstChild);*/
};
const doneIconEventFunction = function (_this) {

    const list = closest(_this, 'li');
    task_list = taskLib.unDone(parseInt(list.getAttribute('data-id')), task_list);

    const element = document.querySelector('.list-output-ul');

    element.appendChild(list);

    list.querySelector('.task-mark-undone i').classList.add('action-undone');
    list.querySelector('.task-mark-undone i').classList.add('fa-square-o');
    list.querySelector('.task-mark-undone i').classList.remove('action-done');
    list.querySelector('.task-mark-undone i').classList.remove('fa-check-square-o');
    list.querySelector('.task-mark-undone').classList.add('action-undone');
    list.querySelector('.task-mark-undone').classList.remove('action-done');

    list.classList.remove('task-done');
    _this.classList.add('task-mark-undone');
    /*
     var el = document.getElementById('thingy'),
     elChild = document.createElement('div');
     elChild.innerHTML = 'Content';

     // Prepend it
     el.insertBefore(elChild, el.firstChild);*/
};
function addElement(task, done) {


    task_list = taskLib.add(task, task_list);

    const newLi = document.createElement("li");
    newLi.className = done ? 'task task-done' : 'task';
    newLi.setAttribute('data-id', ( task_list.length - 1).toString());

    const buttonDone = document.createElement('button');
    buttonDone.className = 'task-mark-undone action-undone';
    buttonDone.setAttribute('data-id', '4');


    const iconDone = document.createElement('i');
    iconDone.className = 'fa fa-square-o action-undone';
    const textSpan = document.createElement('span');
    textSpan.className = 'task-info';

    const text = document.createTextNode(task);
    textSpan.appendChild(text);
    const ulnew = document.querySelector('.list-output-ul');

    const buttonUndone = document.createElement('button');
    buttonUndone.className = 'task-mark-remove pull-right action-close';
    buttonUndone.setAttribute('data-id', '4');

    const iconUndone = document.createElement('i');
    iconUndone.className = 'fa fa-times action-close';

    buttonDone.appendChild(iconDone);
    buttonUndone.appendChild(iconUndone);

    newLi.appendChild(buttonDone);
    newLi.appendChild(textSpan);

    newLi.appendChild(buttonUndone);

    ulnew.appendChild(newLi)
}

function loadTask() {
    if (localStorage.getItem("tasks") === null) {
        localStorage.setItem("tasks", task_list = []);
    } else {
        task_list = JSON.parse(localStorage.getItem("tasks"))
    }
    return task_list;
}
function saveTask(task_list) {
    localStorage.setItem("tasks", JSON.stringify(task_list));
}

document.addEventListener("DOMContentLoaded", function (event) {


    const addTaskForm = document.querySelector('#formSubmit'),
        taskInput = document.querySelector('#todoInput'),
        removeButton = document.querySelectorAll('.task-mark-remove'),
        undoneIcon = document.querySelectorAll('.task-mark-undone');

    addTaskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (taskInput.value == '') {
            alert('Task is empty')
        } else {
            addElement(taskInput.value, false);
            this.reset();
        }
    });

    document.addEventListener('click', function (e) {


        var element;


        if (element = findUpClass(e.target, 'action-close') !== undefined) {
            removeTaskFromView(e.target);
            return;
        }

        element = findUpClass(e.target, 'action-done');

        if (element !== undefined) {
            doneIconEventFunction(element);
            return
        }

        element = findUpClass(e.target, 'action-undone');


        if (element !== undefined) {

            undoneIconEventFunction(element);
            return
        }
        element = findUpId(e.target, 'save_button');


        if (element !== undefined) {
            saveTask(task_list);
            return;
        }
        element = findUpId(e.target, 'load_button');


        if (element !== undefined) {
            task_list = loadTask(task_list);
            loadTaskToView(task_list);
        }

    });


});

