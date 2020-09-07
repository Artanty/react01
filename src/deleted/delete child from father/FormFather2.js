import React, {Fragment} from 'react';
import Form from './Form2';

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
        // this.recieveChildProps = this.recieveChildProps.bind(this);
        // this.handleRemoveChild = this.handleRemoveChild.bind(this);
        this.handleDelete2 = this.handleDelete2.bind(this);


    }

    handleAddChild(index){

        // this.setState({ thisChildId: this.state.thisChildId + 1 });
        this.setState((prevState) => {
            return {thisChildId: prevState.thisChildId + 1}
        });

        // const childWrap = this.renderChild(this.state.thisChildId);
        const child = {id:this.state.thisChildId}
        this.setState({children: [...this.state.children,child]})
        // console.log(this.state.thisChildId);

    }

    componentDidMount(){

        this.handleAddChild();
    }

    handleDelete2(itemId){
        // let itemId = e.target.value;
        const items = this.state.children.filter(item => item.id !== itemId);
        this.setState({ children: items });
        // console.log(e.target.value);
        console.log(itemId);
    };

    // onClick={this.handleDelete2}
    render(){
        return(
            <React.Fragment>

                 {this.state.children.map((item) => (

                     <React.Fragment key={item.id}>
                         <button className="btn btn-primary ml-2" onClick={this.handleAddChild}>Добавить форму</button>
                         <button onClick={()=>this.handleDelete2(item.id)}>father delete</button>
                         <Form key={item.id}
                               id={item.id} />
                     </React.Fragment>


                 ))}

            </React.Fragment>
        )
    }
}
