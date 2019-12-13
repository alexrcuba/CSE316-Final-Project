import React, { Component } from 'react';
import { Rnd } from 'react-rnd';

class JSONcontainer extends Component {
    render() {
        let wireframe = this.props.wireframe;
        let controls = wireframe.controls
        return(
            <Rnd id="JSONcontainer" className="white container" bounds="parent" default={{width: controls.width, height: controls.height, x: 0, y: 0}} style={{position: "relative"}}>
                {controls && controls.map((controls) => {
                    if(controls.type === "label"){
                        console.log(controls.text);
                        return (<div id="label" className="btn-large-flat" style={{textAlign: "center", 
                            background: controls.background, 
                            borderColor: controls.bordercolor,
                            borderWidth: controls.borderwidth,
                            fontSize: controls.fontsize,
                            height: controls.height,
                            width: controls.width,
                            marginTop: controls.top,
                            marginLeft: controls.left,
                            }}>{controls.text}</div>)
                    }
                })}
            </Rnd>
        )
    }
}

export default (JSONcontainer)