
function fnGenerateContainer_FormItem(strId, strPlaceholder){
    elemFormItemContainer = fnCreateEmptyContainer("form-item")
    elemFormItemContainer.id = "container_" + strId;

    elemFormItemInput = document.createElement("input");
    elemFormItemInput.placeholder = strPlaceholder;
    elemFormItemInput.id = "input_" + strId;
    elemFormItemInput.required = "required";
    elemFormItemContainer.appendChild(elemFormItemInput);

    return elemFormItemContainer;
}

function fnGenerateForm_AddOrEditTask(elemMainForm){
    elemFormContainer = fnCreateEmptyContainer("add-edit-task-container");

    elemOverlay = fnCreateEmptyContainer("container-overlay");
    elemFormContainer.appendChild(elemOverlay);


    elemForm = document.createElement("form");
    elemForm.className = "add-edit-task-form";
    elemForm.onSubmit = function(){
        return false
    }
    
    elemForm.appendChild(fnGenerateContainer_FormItem("task_title", "Task Title"));
    elemForm.appendChild(fnGenerateContainer_FormItem("task_description", "Task Descriptions"));



    elemContainer_AddOrCloseButtons = fnCreateEmptyContainer("add-or-close-container");

    elemButton_Add = fnCreateCommonButton({
        className: "confirm-add-button",
        innerText: "Add",
        onclick: fnAddNewTask
    });
    elemContainer_AddOrCloseButtons.appendChild(elemButton_Add);

    elemButton_Close = fnCreateCommonButton({
        className: "confirm-close-button",
        innerText: "Close",
        onclick: fnToggleAddOrEditFormDisplay
    });
    elemContainer_AddOrCloseButtons.appendChild(elemButton_Close);



    
    elemForm.appendChild(elemContainer_AddOrCloseButtons);

    elemFormContainer.appendChild(elemForm);
    
    elemMainForm.appendChild(elemFormContainer);
}



function fnGenerateButton_AddTask(elemMainForm){

    elemContainer = fnCreateEmptyContainer("add-button-container");
    
    elemContainer.appendChild(fnCreateCommonButton({
        innerText: "Add Task",
        onclick: fnToggleAddOrEditFormDisplay
    }));

    elemMainForm.appendChild(elemContainer);

}


function fnGenerateContainer_TaskItem(jsonTaskData){
    
    elemTaskItemContainer = fnCreateEmptyContainer("task-item-container");

    elemTaskTitle = document.createElement("label");
    elemTaskTitle.className = "task-title";
    elemTaskTitle.innerText = jsonTaskData.title;   //WARNING: Sanity Check required for jsonTaskData.title
    elemTaskItemContainer.appendChild(elemTaskTitle);

    elemTaskDescription = document.createElement("div");
    elemTaskDescription.className = "task-description";
    elemTaskDescription.innerText = jsonTaskData.description;   //WARNING: Sanity Check required for jsonTaskData.title
    elemTaskItemContainer.appendChild(elemTaskDescription);


    elemButton_DeleteTask = fnCreateCommonButton({
        className: "btn-delete-task",
        innerText: "Delete",
        onclick: function(){
            delete gl_task_db[jsonTaskData.taskId];
            fnUpdateTaskDB();
        }
    });
    elemTaskItemContainer.appendChild(elemButton_DeleteTask);


    elemButton_EditTask = fnCreateCommonButton({
        className: "btn-edit-task",
        innerText: "Edit",
        onclick: function(){
            //TODO: Pop Up to edit
            fnUpdateTaskDB();
        }
    });
    elemTaskItemContainer.appendChild(elemButton_EditTask);
    

    elemButton_CompleteTask = fnCreateCommonButton({
        className: "btn-complete-task",
        innerText: "Complete",
        onclick: function(){
            gl_task_db[jsonTaskData.taskId]["status"] = task_status_completed;
            fnUpdateTaskDB();
        }
    });
    elemTaskItemContainer.appendChild(elemButton_CompleteTask);
    

    return elemTaskItemContainer;
    
}

function fnGenerateTaskList(elemMainForm){
    elemTaskListContainer = fnCreateEmptyContainer("task-list-container");

    // NOTE: gl_task_db is global variable
    allTasksIDs = Object.keys(gl_task_db);
    if( allTasksIDs.length <= 0 ){
        console.log("Task DB is empty");
        elemNoTaskContainer = fnCreateEmptyContainer("no-task-container");
        elemMainForm.appendChild(elemNoTaskContainer);
        

        elemLabel = document.createElement("label");
        elemLabel.className = "no-task-db-label";
        elemLabel.innerText = "No Task Data to be displayed";

        elemNoTaskContainer.appendChild(elemLabel);

        return;
    }

    for(var i=0; i<allTasksIDs.length; i++){
        eachTaskID = allTasksIDs[i];
        elemTaskListContainer.appendChild( fnGenerateContainer_TaskItem(eachTaskID) );
    }



    elemMainForm.appendChild(elemTaskListContainer);
}
