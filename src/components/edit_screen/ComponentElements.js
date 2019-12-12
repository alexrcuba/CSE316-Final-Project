import React, { Component } from 'react';

class ComponentElements extends Component {
    render() {
        return(
            <div id="ComponentElements" className="row">
            <div className="col s3" style={{height: 50}}> </div>
            <div className="white btn-large col s6" style={{borderStyle: "solid", borderColor: "black"}}></div>
            <div className="col s3" style={{height: 50}}> </div>
            <div className="col s12" style={{textAlign: "center"}}>Container</div>
            <div className="col s12" style={{height: 100}}> </div>
            <div className="btn-large-flat col s12" style={{textAlign: "center"}}>Prompt for Input:</div>
            <div className="col s12" style={{height: 10}}> </div>
            <div className="col s12" style={{textAlign: "center"}}>Label</div>
            <div className="col s12" style={{height: 100}}> </div>
            <div className="col s2" style={{height: 50}}> </div>
            <div className="grey btn col s8" style={{borderStyle: "solid", borderColor: "grey",
                textAlign: "left", textTransform: "none", color: "grey"}}>Input</div>
            <div className="col s2" style={{height: 50}}> </div>
            <div className="col s12" style={{textAlign: "center"}}>Textfield</div>
            </div>
        )
    }
}

export default (ComponentElements)