const local_storage_key_name = "taskdb";
const task_status_new = 0;
const task_status_completed = 1;
let gl_task_db = {};


function fnUpdateTaskDBAndRefreshUI(){
    localStorage.setItem(local_storage_key_name, JSON.stringify(gl_task_db));
    
    fnClearExistingTaskList();

    fnGenerateTaskList( document.getElementById("MainForm") );

    setTimeout(function(){
        window.location.reload();
    }, 50);
}

function fnAddNewTask(){
    console.log("add new task");

    strNewTaskTitle = document.getElementById("input_task_title").value;
    strNewTaskDescription = document.getElementById("input_task_description").value;
    //Additional Validation??


    //WARNING: assume gl_task_db doesn't get reset
    intNewId = Object.keys(gl_task_db).length+1;
    gl_task_db[intNewId] = {
        taskId: intNewId,
        title: strNewTaskTitle,
        description: strNewTaskDescription,
        status: task_status_new
    };
    
    fnUpdateTaskDBAndRefreshUI();

    fnToggleAddOrEditFormDisplay(); //Not needed since page will be reload?
}

function fnEditExistingTask(){
    console.log("update existing task");

    strUpdatedTaskTitle = document.getElementById("input_task_title").value;
    strUpdatedTaskDescription = document.getElementById("input_task_description").value;
    //Additional Validation??


    elemInput_TaskId = document.getElementById('affected_task_id');
    strTaskId = elemInput_TaskId.value;
    gl_task_db[strTaskId] = {
        title: strUpdatedTaskTitle,
        description: strUpdatedTaskDescription
    };
    
    fnUpdateTaskDBAndRefreshUI();

    fnToggleAddOrEditFormDisplay(); //Not needed since page will be reload?
}


function main(){
    console.log("generate form");
    elem_MainForm = document.createElement("form");
    elem_MainForm.id = "MainForm";
    
    document.getElementsByTagName("main")[0].appendChild(elem_MainForm);
    
    str_rawjson_taskdb = localStorage.getItem(local_storage_key_name);
    if( str_rawjson_taskdb != null && str_rawjson_taskdb != "" ){
        gl_task_db = JSON.parse(str_rawjson_taskdb);
    }
    fnGenerateTaskList(elem_MainForm);

    fnGenerateButton_AddTask(elem_MainForm);

    fnGenerateForm_AddOrEditTask(elem_MainForm);  //hidden by default
}


document.body.onload = function(){
    setTimeout( function(){
        main();
    }, 100);
}

console.log("index.js loaded");