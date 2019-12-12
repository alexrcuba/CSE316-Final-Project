import React, { Component } from 'react';

class ZoomSaveCancel extends Component {
    render() {
        return(
            <div class="row">
            <a className="clicker black-text col s2"><i class="material-icons">zoom_in</i></a>
            <a className="clicker black-text col s2"><i class="material-icons">zoom_out</i></a>
            <a className="clicker black-text col s4">Save</a>
            <a className="clicker black-text col s4">Cancel</a>
            </div>
        )
    }
}

export default (ZoomSaveCancel)