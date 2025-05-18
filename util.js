function fnValidateNotNil(rawData){
    if(rawData==null){
        return null
    }
    if(typeof(rawData)=='undefined'){
        return null;
    }

    return rawData;
}