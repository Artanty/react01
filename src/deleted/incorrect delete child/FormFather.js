import React, {Fragment} from 'react';
import Form from './Form';

import "bootstrap/dist/css/bootstrap.css";

import {getFormValues_all,convertArrayToObject_all} from './convertService.js';

export default class FormFather extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            children: [],
            thisChildId: 0,
            childrenInputFields: [{formId:0,formTitle:'',items:[]}]
        }
        this.handleAddChild = this.handleAddChild.bind(this);
        this.recieveChildProps = this.recieveChildProps.bind(this);
        this.handleRemoveChild = this.handleRemoveChild.bind(this);

    }
    renderChild(id){
        return <Form id={id} triggerFatherFunc={this.recieveChildProps}/>
    }
    handleAddChild(){

        // this.setState({ thisChildId: this.state.thisChildId + 1 });
        this.setState((prevState) => {
            // Важно: считывайте `prevState` вместо `this.state` во время обновления.
            return {thisChildId: prevState.thisChildId + 1}
        });

        const child = this.renderChild(this.state.thisChildId);

        this.setState({children: [...this.state.children,child]})

    }
    handleRemoveChild(index){
        // const values = [...this.state.children];
        // values.splice(index, 1);
        // this.setState(state => ({
        //     children: values
        // }));

        // console.log(index);
        // const values = [...this.state.children];
        // const item = values[index];
        // console.log(item);
        // let newArr = values.filter(el => el !== item);
        // // values.splice(moveFromIndex, 1);
        // console.log(newArr);
        // this.setState(state => ({
        //     children: newArr
        // }));

        const values = [...this.state.children];

        values.splice(index, 1);
        console.log('индекс из массива: '+ index);

        // this.setState(state => ({
        //     children: values
        // }));

        this.setState((prevState) => {
            // Важно: считывайте `prevState` вместо `this.state` во время обновления.
            return {values: prevState.children = values}
        });


    }
    componentDidMount(){
        
        this.handleAddChild();
    }
    recieveChildProps(child){
        let arr = this.state.childrenInputFields;//сокращаем для читабельности
        arr = arr.filter(el => el.formId !== child.formId);//убираем старые значения ребенка
        
        this.setState(state => ({
            childrenInputFields: [...arr,child] //пушим новые значения ребенка
        }));

        // console.log(this.state.childrenInputFields);

    }
    
    render(){
        return(
            <React.Fragment>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-6">
                {this.state.children.map((item, index) => (
                    <Fragment key={`${item}~${index}`}>
                    <div className="row">
                        <div className="col-12">
                            <fieldset>
                              <legend>
                                
                                <button className="btn btn-primary ml-2" onClick={this.handleAddChild}>Добавить форму</button>
                                <button className="btn btn-danger mx-2" disabled={this.state.children.length<2} onClick={()=>this.handleRemoveChild(index)}
                                >Удалить форму</button>



                              </legend>
                                {item}
                            </fieldset>
                        </div>
                    </div>
                    </Fragment>


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
