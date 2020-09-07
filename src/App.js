import React, { useState, Fragment } from 'react';
// import logo from './logo.svg';
import './App.css';

import "bootstrap/dist/css/bootstrap.css";

const App = () => {
    const [inputFields, setInputFields] = useState([
      {inputType: 'email', inputValue: ''}//хуки https://ru.reactjs.org/docs/hooks-state.html
    ]);
    const [converted1, setConverted1] = useState([]);
    const [converted2, setConverted2] = useState([]);

  const handleInputChange = (index, event) => {
    // we spread inputFields and do a simple check for the input field based on the name attribute of that field
    // Then we supply the value for the given index.
    // The index is derived from the map function we used previously.
        const values = [...inputFields];
    if (event.target.name === "inputType") {
      values[index].inputType = event.target.value;
      setValidation(values, index, event.target.value);
    } else {
      values[index].inputValue = event.target.value;
    }
    

    setInputFields(values);
    getFormValues();
  };

  const setValidation = (values, index, type) => {
    switch (type) {
      case 'email':
        values[index].validType = 'email';
        values[index].validPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';        
        break;
      case 'phone':
        values[index].validType =  'number';
        values[index].validPattern = '[789][0-9]{9}';
        break;
      default:
        values[index].validType =  'url';
        values[index].validPattern = 'https?://.+';  
      }
  }

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ inputType: 'email', inputValue: '' });
    setInputFields(values);
    
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);

  };
  
  const getFormValues = () => {
      
    const typeArr = inputFields.map(el => el.inputType);
    const valueArr = inputFields.map(el => el.inputValue);

    const obj = {
      type: typeArr,
      value: valueArr
    }

    setConverted1(obj);
    
    convertArrayToObject(obj);

  }
  
  const convertArrayToObject = (e) => {
    
    const obj = e.type.map(function(v, i) {
      return {
        type: e.type[i],
        value: e.value[i]
      };
    })

    setConverted2(obj);
  }
  const submit = (e) =>{
    e.preventDefault();
    alert('Форма успешно заполнена!');
  }
   
  return (
      <><div className="container">
        <h1>Моя реактивная форма</h1>
        {/*function handleSubmit to log the value returned when the form is submitted
        The JavaScript map function is used to create an array of the form fields.
        Fragment from React allows us to group a list of children without adding a new node to the DOM.
        */}
        
        <br/>
        

        <div className="row">
          <div className="col-sm-6 col-md-8 col-lg-6">
            <form onSubmit={e => submit(e)}>
          
            
            {inputFields.map((inputField, index) => (
              <div className="form-row d-flex justify-content-around">
                
                <Fragment key={`${inputField}~${index}`}>

                  <div className="form-group col-sm-8 col-md-3 col-lg-5">
                    <select name="inputType" value={inputField.inputType} onChange={event => handleInputChange(index,event)} 
                    className="form-control">
                      <option value="email">Имеил</option>
                      <option value="phone">Телефон</option>
                      <option value="link">Ссылка</option>
                    </select>

                  </div>
                  <div className="form-group col-sm-12 order-sm-last order-md-2 col-md-5 col-lg-5">
                    <input
                        type={inputField.validType ? inputField.validType : 'email'}
                        pattern={inputField.validPattern}
                        placeholder="Введите значение"
                        className="form-control"
                        id="inputValue"
                        name="inputValue"
                        value={inputField.inputValue}
                        onChange={event => handleInputChange(index,event)}
                        required
                    />
                  </div>
                  <div className="form-group col-xs-1 col-sm-2 col-md-2 order-sm-2 col-lg-1 d-flex">
                    
                    <button
                        className="btn btn-primary w-100"
                        type="button"
                        onClick={() => handleAddFields()}
                    >
                      +
                    </button>
                  </div>
                  <div className="form-group col-xs-1 col-sm-2 col-md-2 order-sm-3 col-lg-1 d-flex">
                    <button
                        className="btn btn-danger w-100"
                        type="button"
                        onClick={() => handleRemoveFields(index)}
                        disabled={inputFields.length<2}
                    >
                      -
                    </button>
                  </div>
                </Fragment>
              </div>
            ))}
              <div className="submit-button">
                <button
                    className="btn btn-primary mr-2"
                    type="submit"
                    
                >
                  Отправить
                </button>
              </div>
          
            </form>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-6">
              
              <h2>Результат getFormValues:</h2>
                <pre>
                  {JSON.stringify(converted1, null, 2)}
                </pre>
              
              <h2>Результат convertArrayToObject:</h2>
                <pre>
                  {JSON.stringify(converted2, null, 2)}
                </pre>
              
          </div>
        </div>
        </div>
      </>

  );
  }


export default App;
