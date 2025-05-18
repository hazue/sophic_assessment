
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

function fnGenerateForm_AddOrEditTask(elemMainForm){
    elemFormContainer = fnCreateEmptyContainer("add-edit-task-container");

    elemOverlay = fnCreateEmptyContainer("container-overlay");
    elemFormContainer.appendChild(elemOverlay);


    elemForm = document.createElement("form");
    elemForm.className = "add-edit-task-form";
    elemForm.onSubmit = function(){
        return false
    }
    
    formItem_TaskTitle = fnGenerateContainer_FormItem("task_title", "Task Title (MAX 30 Character)");
    formItem_TaskTitle.children[0].maxLength = 30;
    elemForm.appendChild(formItem_TaskTitle);

    formItem_TaskDescription = fnGenerateContainer_FormItem("task_description", "Task Descriptions");
    elemForm.appendChild(formItem_TaskDescription);



    elemContainer_AddOrCloseButtons = fnCreateEmptyContainer("add-or-close-container");

    elemButton_Add = fnCreateCommonButton({
        id: "confirm_add_or_edit_button",
        className: "confirm-add-or-edit-button",
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

    elemHiddenInput = document.createElement("input");
    elemHiddenInput.id = "affected_task_id";
    elemHiddenInput.type = "hidden";
    elemHiddenInput.value = "-1";

    elemForm.appendChild(elemHiddenInput);

    
    elemForm.appendChild(elemContainer_AddOrCloseButtons);

    elemFormContainer.appendChild(elemForm);
    
    elemMainForm.appendChild(elemFormContainer);
}



function fnGenerateButton_AddTask(elemMainForm){

    elemContainer = fnCreateEmptyContainer("add-button-container");
    
    elemContainer.appendChild(fnCreateCommonButton({
        innerText: "+ Add Task",
        onclick: fnToggleAddOrEditFormDisplay
    }));

    elemMainForm.appendChild(elemContainer);

}


function fnGenerateContainer_TaskItem(taskId, jsonTaskData){
    
    elemTaskItemContainer = fnCreateEmptyContainer("task-item-container");

    elemTaskTitle = document.createElement("label");
    elemTaskTitle.className = "task-title";
    elemTaskTitle.innerText = jsonTaskData.title;   //WARNING: Sanity Check required for jsonTaskData.title
    elemTaskItemContainer.appendChild(elemTaskTitle);

    elemTaskDescription = document.createElement("div");
    elemTaskDescription.className = "task-description";
    elemTaskDescription.innerText = jsonTaskData.description;   //WARNING: Sanity Check required for jsonTaskData.title
    elemTaskItemContainer.appendChild(elemTaskDescription);



    
    elemButtonContainer = fnCreateEmptyContainer("task-item-buttons-container");

    elemButton_DeleteTask = fnCreateCommonButton({
        className: "btn-delete-task",
        innerText: "Delete",
        onclick: function(){
            delete gl_task_db[taskId];
            fnUpdateTaskDBAndRefreshUI();
        }
    });
    elemButtonContainer.appendChild(elemButton_DeleteTask);

    
    if(jsonTaskData.status == task_status_completed){
        elemTaskItemContainer.className += " completed";
    }else{
        elemButton_EditTask = fnCreateCommonButton({
            className: "btn-edit-task",
            innerText: "Edit",
            onclick: function(){
                elemInput_TaskTitle = document.getElementById('input_task_title');
                elemInput_TaskTitle.value = jsonTaskData.title;
                elemInput_TaskDescription = document.getElementById('input_task_description');
                elemInput_TaskDescription.value = jsonTaskData.description;
                elemInput_TaskId = document.getElementById('affected_task_id');
                console.log("[DEBUG] jsonTaskData");
                console.log(jsonTaskData);
                elemInput_TaskId.value = taskId;


                elemButton_ConfirmEditing = document.getElementById('confirm_add_or_edit_button');
                elemButton_ConfirmEditing.innerText = "Edit";
                elemButton_ConfirmEditing.onclick = fnEditExistingTask;

                fnToggleAddOrEditFormDisplay();
            }
        });
        elemButtonContainer.appendChild(elemButton_EditTask);
        
        elemButton_CompleteTask = fnCreateCommonButton({
            className: "btn-complete-task",
            innerText: "Complete",
            onclick: function(){
                gl_task_db[taskId]["status"] = task_status_completed;
                fnUpdateTaskDBAndRefreshUI();
            }
        });
        elemButtonContainer.appendChild(elemButton_CompleteTask);
    }
    



    elemTaskItemContainer.appendChild(elemButtonContainer);

    return elemTaskItemContainer;
    
}

function fnClearExistingTaskList(){
    elemExistingContainer = document.getElementsByClassName("task-list-container");
    if( elemExistingContainer.length > 0 ){
        elemExistingContainer[0].remove();
        return;
    }
    
    elemExistingContainer = document.getElementsByClassName("no-task-container");
    if( elemExistingContainer.length > 0 ){
        elemExistingContainer[0].remove();
        return;
    }
}

function fnGenerateTaskList(elemMainForm){
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

    elemTaskListContainer = fnCreateEmptyContainer("task-list-container");

    for(var i=0; i<allTasksIDs.length; i++){
        eachTaskID = allTasksIDs[i];
        elemTaskListContainer.appendChild( fnGenerateContainer_TaskItem(eachTaskID, gl_task_db[eachTaskID]) );
    }



    elemMainForm.appendChild(elemTaskListContainer);
}
