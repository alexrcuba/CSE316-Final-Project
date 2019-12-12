import React, { Component } from 'react';

class PropertiesToolbar extends Component {
    render() {
        return(
            <div id="PropertiesToolbar" className="row">
            <div className="col s12">Properties:</div>
            <div class="input-field col s12">
                <input id="name" type="text" class="validate"></input>
                <label for="name">Component</label>
            </div>
            <div className="col s12" style={{height: 20}}> </div>
            <div class="col s6">Font Size:</div>
            <div class="input-field col s6">
                <input id="font_size" type="number" class="validate"></input>
            </div>
            <div className="col s12" style={{height: 20}}> </div>
            <div class="col s6">Background:</div>
            <div class="input-field col s6">
                <input id="font_size" type="color" class="validate"></input>
            </div>
            <div className="col s12" style={{height: 20}}> </div>
            <div class="col s6">Border Color:</div>
            <div class="input-field col s6">
                <input id="font_size" type="color" class="validate"></input>
            </div>
            <div className="col s12" style={{height: 20}}> </div>
            <div class="col s6">Border Thickness:</div>
            <div class="input-field col s6">
                <input id="font_size" type="number" class="validate"></input>
            </div>
            <div class="col s6">Border Radius:</div>
            <div class="input-field col s6">
                <input id="font_size" type="number" class="validate"></input>
            </div>
            </div>
        )
    }
}

export default (PropertiesToolbar)