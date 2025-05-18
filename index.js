const local_storage_key_name = "taskdb";
const task_status_new = 0;
const task_status_completed = 1;
let gl_task_db = {};


function fnUpdateTaskDB(){
    localStorage.setItem(local_storage_key_name, JSON.stringify(gl_task_db));
}

function fnToggleAddOrEditFormDisplay(){
    console.log("toggle form display");
    elemForm_AddEditTaskContainer = document.getElementsByClassName("add-edit-task-container")[0];

    strCurrentVisibility = elemForm_AddEditTaskContainer.style.display;
    if( strCurrentVisibility == '' || strCurrentVisibility == 'none'){
        elemForm_AddEditTaskContainer.style.display = "block";
    }else{
        elemForm_AddEditTaskContainer.style.display = "none";
    }
    
}

function fnAddNewTask(){
    console.log("add new task");

    strNewTaskTitle = document.getElementById("input_task_title").value;
    strNewTaskDescription = document.getElementById("input_task_description").value;
    //Additional Validation??


    //WARNING: assume gl_task_db doesn't get reset
    intNewId = gl_task_db.tasks.length+1;
    gl_task_db[intNewId] = {
        title: strNewTaskTitle,
        description: strNewTaskDescription,
        status: task_status_new
    };
    
    fnUpdateTaskDB();

    fnGenerateTaskList( document.getElementById("MainForm") );
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