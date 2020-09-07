import React, {Fragment} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import ResultBox from './ResultBox';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputFields: [{inputType: 'email', inputValue: '', validType:'email', validPattern:'[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'}],
            formTitle: 'Форма '+ (props.id + 1),
            collapsed: false //prop for child collapse
        };
        this.thisId = '';
        this.submit = this.submit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRemoveFields = this.handleRemoveFields.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.triggerCollapseChild = this.triggerCollapseChild.bind(this);

    }

    handleInputChange(index, event){
        const values = [...this.state.inputFields];
        if (event.target.name === "inputType") {
            values[index].inputType = event.target.value;
            this.setValidation(values, index, event.target.value);
        } else {
            values[index].inputValue = event.target.value;
        }
        this.setState(state => ({
            inputFields: values
        }));
        this.refreshFather();

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
        this.setState(state => ({
            inputFields: values
        }));
        this.refreshFather();
    };
    handleRemoveFields(index){
        const values = [...this.state.inputFields];
        values.splice(index, 1);

        this.setState(state => ({
            inputFields: values
        }));
        this.refreshFather();
    };
    triggerCollapseChild(e){
        e.preventDefault();
        this.setState({collapsed: !this.state.collapsed});
    }

    submit(e){
        e.preventDefault();
        alert('Форма c id=' + this.props.id + ' успешно заполнена!');
    }
    componentDidMount(){
        // this.refreshFather();
        // console.log(this.props.id);
        // this.thisId = this.props.id;
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        // console.log(prevProps);
        // console.log(this.props);
    }

    componentWillUnmount() {
        console.log('form delete id: ' + this.props.id);//некорректно!
        // this.props.triggerFatherFunc({formId:this.props.id,formTitle:'deleted',items:[]});
        // console.log(this.thisId);
    }
    handleChangeTitle(e){
        this.setState({formTitle: e.target.value});
    }
    refreshFather(){
        // this.props.triggerFatherFunc({formId:this.props.id,formTitle:this.state.formTitle,items:this.state.inputFields});
    }
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-12">
                        <form onSubmit={this.submit}>
                            <div className="form-row d-flex justify-content-around">
                                <div className="form-group col-12">
                                    <input className="form-control" placeholder="Название формы" value={this.state.formTitle} onChange={this.handleChangeTitle} />
                                </div>
                            </div>

                            {this.state.inputFields.map((inputField, index) => (
                                <React.Fragment key={`${inputField}~${index}`} >
                                <div className="form-row d-flex justify-content-around">



                                        <div className="form-group col-sm-8 col-md-3 col-lg-4">
                                            <select name="inputType" value={inputField.inputType} onChange={event => this.handleInputChange(index,event)}
                                                    className="form-control">
                                                <option value="email">Имеил</option>
                                                <option value="phone">Телефон</option>
                                                <option value="link">Ссылка</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-12 order-sm-last order-md-2 col-md-5 col-lg-4">
                                            <input
                                                type={inputField.validType ? inputField.validType : 'email'}
                                                placeholder="Введите значение" className="form-control" id="inputValue" name="inputValue" required
                                                value={inputField.inputValue} pattern={inputField.validPattern}
                                                onChange={event => this.handleInputChange(index,event)}
                                            />
                                        </div>
                                        <div className="form-group col-xs-1 col-sm-2 col-md-2 order-sm-2 col-lg-2 d-flex">
                                            <button
                                                className="btn btn-primary w-100" type="button"
                                                onClick={() => this.handleAddFields()}
                                            > + </button>
                                        </div>
                                        <div className="form-group col-xs-1 col-sm-2 col-md-2 order-sm-3 col-lg-2 d-flex">
                                            <button
                                                className="btn btn-danger w-100" type="button"
                                                onClick={() => this.handleRemoveFields(index)}
                                                disabled={this.state.inputFields.length<2}
                                            > - </button>
                                        </div>

                                </div>
                                </React.Fragment>
                            ))}

                            <button className="btn btn-success mr-2" type="submit">Отправить</button>
                            <button className="btn btn-link" onClick={this.triggerCollapseChild}>Информация</button>

                        </form>
                        <ResultBox collapsed={this.state.collapsed} data={this.state.inputFields}/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}