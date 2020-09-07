import React, {Fragment} from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Artyom1',
            buttonText: 'button',
            isToggleOn: true,

            inputFields: [{inputType: 'email', inputValue: ''}],
            converted1: [],
            converted2: [],
            group: [{groupTitle: 'группа1', inputFields: this.inputFields}]
        };
        this.name = 'Artyom2';
        // this.inputFields = [{inputType: 'email', inputValue: ''}];
        // Эта привязка обязательна для работы `this` в колбэке.
        this.handleClick = this.handleClick.bind(this);
        this.submit = this.submit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRemoveFields = this.handleRemoveFields.bind(this);


    }
    handleInputChange(index, event){
        // we spread inputFields and do a simple check for the input field based on the name attribute of that field
        // Then we supply the value for the given index.
        // The index is derived from the map function we used previously.
        const values = [...this.state.inputFields];
        if (event.target.name === "inputType") {
            values[index].inputType = event.target.value;
            this.setValidation(values, index, event.target.value);
        } else {
            values[index].inputValue = event.target.value;
        }
        // this.setInputFields(values);
        this.setState(state => ({
            inputFields: values
        }));
        this.getFormValues();
    }
    setValidation(values, index, type){
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
    handleAddFields(){
        const values = [...this.state.inputFields];
        values.push({ inputType: 'email', inputValue: '' });
        // this.setInputFields(values);
        this.setState(state => ({
            inputFields: values
        }));

    };
    handleRemoveFields(index){
        const values = [...this.state.inputFields];
        values.splice(index, 1);
        this.setState(state => ({
            inputFields: values
        }));

    };
    getFormValues(){

        const typeArr = this.state.inputFields.map(el => el.inputType);
        const valueArr = this.state.inputFields.map(el => el.inputValue);

        const obj = {
            type: typeArr,
            value: valueArr
        }

        // this.setConverted1(obj);
        this.setState(state => ({
            converted1: obj
        }));

        this.convertArrayToObject(obj);

    }
    convertArrayToObject(e){

        const obj = e.type.map(function(v, i) {
            return {
                type: e.type[i],
                value: e.value[i]
            };
        })

        // this.setConverted2(obj);
        this.setState(state => ({
            converted: obj
        }));
    }
    //another
    handleClick(){
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));

    }
    submit(e){
        e.preventDefault();
        alert('Форма успешно заполнена!');
    }
    render() {
        return (
            <React.Fragment>
                {/*<h1>Привет, {this.state.name}</h1>*/}
                {/*<h1>Привет, {this.name}</h1>*/}
                {/*<h2>Состояние isToggleOn: {this.state.isToggleOn ? 'Включено' : 'Выключено'}</h2>*/}
                {/*<button onClick={this.handleClick}>{this.state.buttonText}</button>*/}
                {/*<button onClick={this.submit}>Button2</button>*/}

                <div className="container">
                    {/*<h1>Моя реактивная форма</h1>*/}
                    {/*function handleSubmit to log the value returned when the form is submitted
        The JavaScript map function is used to create an array of the form fields.
        Fragment from React allows us to group a list of children without adding a new node to the DOM.
        */}

                    <br/>


                    <div className="row">
                        <div className="col-sm-6 col-md-8 col-lg-6">
                            <form onSubmit={this.submit}>


                                {this.state.inputFields.map((inputField, index) => (
                                    <div className="form-row d-flex justify-content-around">

                                        <Fragment key={`${inputField}~${index}`}>

                                            <div className="form-group col-sm-8 col-md-3 col-lg-5">
                                                <select name="inputType" value={inputField.inputType} onChange={event => this.handleInputChange(index,event)}
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
                                                    onChange={event => this.handleInputChange(index,event)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-xs-1 col-sm-2 col-md-2 order-sm-2 col-lg-1 d-flex">

                                                <button
                                                    className="btn btn-primary w-100"
                                                    type="button"
                                                    onClick={() => this.handleAddFields()}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="form-group col-xs-1 col-sm-2 col-md-2 order-sm-3 col-lg-1 d-flex">
                                                <button
                                                    className="btn btn-danger w-100"
                                                    type="button"
                                                    onClick={() => this.handleRemoveFields(index)}
                                                    disabled={this.state.inputFields.length<2}
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
                        <div className="col-sm-6 col-md-4 col-lg-6" style={{'display':'none'}}>

                            <h2>Результат getFormValues:</h2>
                            <pre>
                  {JSON.stringify(this.state.converted1, null, 2)}
                </pre>

                            <h2>Результат convertArrayToObject:</h2>
                            <pre>
                  {JSON.stringify(this.state.converted2, null, 2)}
                </pre>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}