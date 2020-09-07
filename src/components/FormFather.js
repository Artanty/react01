import React from 'react';
import Form from './Form';

import "bootstrap/dist/css/bootstrap.css";

import {getFormValues_all,convertArrayToObject_all} from './convertService.js';

export default class FormFather extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            children: [],
            thisChildId: 1,
            childrenInputFields: [{formId:0,formTitle:'',items:[]}]
        }
        this.handleAddChild = this.handleAddChild.bind(this);
        this.handleRemoveChild = this.handleRemoveChild.bind(this);
        this.receiveChildProps = this.receiveChildProps.bind(this);


    }
    handleAddChild(){

        this.setState((prevState) => {//https://learn-reactjs.ru/faq/component-state
            return {thisChildId: prevState.thisChildId + 1}
        });

        const child = {id:this.state.thisChildId}
        this.setState({children: [...this.state.children,child]})

    }
    handleRemoveChild(itemId){

        const items = this.state.children.filter(item => item.id !== itemId);
        this.setState({ children: items });

    }
    componentDidMount(){
        
        this.handleAddChild();
    }
    receiveChildProps(childData){
        let arr = this.state.childrenInputFields;
        arr = arr.filter(el => el.formId !== childData.formId);//убираем ребенка со старыми значениями

        if(childData.action === 'remove'){
            this.setState(state => ({
                childrenInputFields: arr //пушим массив без ребенка
            }));
        }
        if(childData.action === 'update'){
            this.setState(state => ({
                childrenInputFields: [...arr,childData] //пушим новые значения ребенка
            }));
        }
        // console.log(childData.action);

    }
    
    render(){
        return(
            <React.Fragment>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-6">
                {this.state.children.map((item) => (
                    <React.Fragment key={item.id}>
                    <div className="row mt-2">
                        <div className="col-12">
                            <fieldset>
                              <legend>
                                
                                <button className="btn btn-primary ml-2" onClick={this.handleAddChild}>Добавить форму</button>
                                <button className="btn btn-danger mx-2" disabled={this.state.children.length<2} onClick={()=>this.handleRemoveChild(item.id)}
                                >Удалить форму</button>

                              </legend>

                                <Form key={item.id} id={item.id} triggerFatherFunc={this.receiveChildProps}/>

                            </fieldset>
                        </div>
                    </div>
                    </React.Fragment>


                ))}
                    </div>
                    <div className="col-3">
                        <h6>Результат getFormValues_all:</h6>
                        <pre>{getFormValues_all(this.state.childrenInputFields)}</pre>
                    </div>
                    <div className="col-3">
                        <h6>Результат convertArrayToObject_all:</h6>
                        <pre>{convertArrayToObject_all(this.state.childrenInputFields)}</pre>
                    </div>

                </div>
            </div>
            </React.Fragment>
        )
    }
}
