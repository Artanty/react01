// FOR ALL FORMS (formFather)
export function getFormValues_all(data){
	return JSON.stringify(getFormValuesData_all(data), null, 2);
}

function getFormValuesData_all(data){
	
	const formTitle = data.map(el => el.formTitle);
	const typeArr = data.map(el => (el.items.map(l=>l.inputType)));
	const valueArr = data.map(el => (el.items.map(l=>l.inputValue)));

    const obj = {
    	form: formTitle,
        type: typeArr,
        value: valueArr
    }
    return obj;
}

export function convertArrayToObject_all(data){

	const arr = getFormValuesData_all(data);
    const obj = arr.type.map(function(v, i) {
        return {
        	form: arr.form[i],
            type: arr.type[i],
            value: arr.value[i]
        };
    })

    return JSON.stringify(obj, null, 2);
}

// FOR ONE FORM
export function getFormValues(data){
    return JSON.stringify(getFormValuesData(data), null, 2);
}
function getFormValuesData(data){

        const typeArr = data.map(el => el.inputType);
        const valueArr = data.map(el => el.inputValue);

        const obj = {
            type: typeArr,
            value: valueArr
        }

        return obj;

    }

export function convertArrayToObject(data){
    const arr = getFormValuesData(data);
    const obj = arr.type.map(function(v, i) {

        return {
            type: arr.type[i],
            value: arr.value[i]
        };
    })

    return JSON.stringify(obj, null, 2);
}