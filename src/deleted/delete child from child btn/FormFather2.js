import React, {Fragment} from 'react';
import Form from './Form2';

import "bootstrap/dist/css/bootstrap.css";

import {getFormValues_all,convertArrayToObject_all} from './convertService.js';

export default class FormFather extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            children: [{id:1,value:1},{id:2,value:2}],
            thisChildId: 0,
            childrenInputFields: [{formId:0,formTitle:'',items:[]}]
        }
        this.handleAddChild = this.handleAddChild.bind(this);
        // this.recieveChildProps = this.recieveChildProps.bind(this);
        // this.handleRemoveChild = this.handleRemoveChild.bind(this);

    }
    renderChild(id){
        return <Form />
    }
    handleAddChild(index){

        // this.setState({ thisChildId: this.state.thisChildId + 1 });
        // this.setState((prevState) => {
        //     // Важно: считывайте `prevState` вместо `this.state` во время обновления.
        //     return {thisChildId: prevState.thisChildId + 1}
        // });

        const childWrap = this.renderChild(this.state.thisChildId);
        const child = {id:index,value:childWrap}
        this.setState({children: [...this.state.children,child]})

    }

    componentDidMount(){

        this.handleAddChild();
    }

    handleDelete = itemId => {
        const items = this.state.children.filter(item => item.id !== itemId);
        this.setState({ children: items });
    };
    render(){
        return(
            <React.Fragment>

                 {this.state.children.map((item) => (

                     <React.Fragment>
                         <button className="btn btn-primary ml-2" onClick={this.handleAddChild}>Добавить форму</button>

                         <Form key={item.id}
                               value={item.value}
                               onDelete={this.handleDelete}
                               id={item.id} />
                     </React.Fragment>


                 ))}

            </React.Fragment>
        )
    }
}
