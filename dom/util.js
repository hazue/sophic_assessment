
function fnCreateCommonButton(domData){
    elemNewButton = document.createElement("button");

    buttonType = fnValidateNotNil(domData.type);
    if( buttonType != null ){
        elemNewButton.type = buttonType;
    }else{
        elemNewButton.type = "button";      //default to type="button" NOT type="submit"
    }

    elemId = fnValidateNotNil(domData.id);
    if( elemId != null ){
        elemNewButton.id = elemId;
    }

    className = fnValidateNotNil(domData.className);
    if( className != null ){
        elemNewButton.className = className;
    }else{
        elemNewButton.className = "btn-common-style";   //default all button to have same className (thus same CSS styling)
    }

    innerText = fnValidateNotNil(domData.innerText);
    if( innerText != null ){
        elemNewButton.innerText = innerText;
    }

    fnOnClick = fnValidateNotNil(domData.onclick);
    if( fnOnClick != null ){
        elemNewButton.onclick = fnOnClick;
    }

    return elemNewButton;
}

//REQUIRED: all containers MUST HAVE a class name
function fnCreateEmptyContainer(strClassName){
    elemNewContainer = document.createElement("div");
    elemNewContainer.className = strClassName;

    return elemNewContainer;
}
