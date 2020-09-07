import React  from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {getFormValues,convertArrayToObject} from './convertService.js';

export default class ResultBox extends React.Component {
    constructor(props) {
        super(props);

    }   
    
    
    render() {
        return (
            <>
                <div className={this.props.collapsed ? 'collapse mt-2 show' : 'collapse mt-2'}>
                  <div className="card">
                    <div className="card card-body">
                      
                      <div className="row">
                          <div className="col-6">
                              <h6>Результат getFormValues:</h6>
                              <pre>{convertArrayToObject(this.props.data)}</pre>
                          </div>
                          <div className="col-6">
                              <h6>Результат convertArrayToObject:</h6>
                              <pre>{getFormValues(this.props.data)}</pre>
                          </div>
                      </div>

                    </div>
                  </div>
                </div>
            </>          
        )
    }
}