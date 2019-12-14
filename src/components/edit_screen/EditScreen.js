import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Icon } from 'react-materialize';
import { Rnd } from 'react-rnd';
import { updateListName, zoomInOut } from '../../store/actions/actionCreators.js';

class EditScreen extends Component {
    state = {
        editedComponent: {
            key: null,
            type: null,
            text: null,
            fontsize: null,
            fontcolor: null,
            background: null,
            bordercolor: null,
            borderwidth: null,
            borderradius: null,
        },
        originalWireframe: null
    }

    handleChange = (wireframe, e) => {
        const { target } = e;
        console.log(wireframe);
        if (target.id === "name") {
            this.props.updateListName(target.value, wireframe.id);

        } else if (target.firstChild != null) {
            if (target.firstChild.data === "zoom_in") {
                wireframe.container.zoomamount += 1;
                wireframe.container.height *= 2;
                wireframe.container.width *= 2;
                if (wireframe.container.height > 5000 || wireframe.container.width > 5000) {
                    console.log("ZOOM IN FAILED");
                    wireframe.container.zoomamount -= 1;
                    wireframe.container.height /= 2;
                    wireframe.container.width /= 2;
                    return;
                }
                let controls = wireframe.controls;
                controls && controls.forEach((controls) => {
                    controls.fontsize *= 2;
                    controls.borderwidth *= 2;
                    controls.borderRadius *= 2;
                    controls.height *= 2;
                    controls.width *= 2;
                    controls.top *= 2;
                    controls.left *= 2;
                });
                wireframe.controls = controls;
                this.props.zoomInOut(wireframe, wireframe.id);
            } else if (target.firstChild.data === "zoom_out") {
                wireframe.container.zoomamount -= 1;
                wireframe.container.height /= 2;
                wireframe.container.width /= 2;
                if (wireframe.container.height < 1 || wireframe.container.width < 1) {
                    console.log("ZOOM OUT FAILED");
                    wireframe.container.zoomamount += 1;
                    wireframe.container.height *= 2;
                    wireframe.container.width *= 2;
                    return;
                }
                let controls = wireframe.controls;
                controls && controls.forEach((controls) => {
                    controls.fontsize /= 2;
                    controls.borderwidth /= 2;
                    controls.borderRadius /= 2;
                    controls.height /= 2;
                    controls.width /= 2;
                    controls.top /= 2;
                    controls.left /= 2;
                });
                wireframe.controls = controls;
                this.props.zoomInOut(wireframe, wireframe.id);
            }
        }
    }
    sortCriteria = 'none';
    changedTime = false;

    updateTime = () => {
        console.log("updating time")
        let fireStore = getFirestore();
        fireStore.collection('wireframes').doc(this.props.wireframe.id).update({ time: Date.now() })
    }

    render() {
        const auth = this.props.auth;
        let wireframe = this.props.wireframe;

        if (!auth.uid) {
            return <Redirect to="/" />;
        } else{
            console.log(auth);
        }

        if (!wireframe)
            return <React.Fragment />

        let controls = wireframe.controls;
        let container = wireframe.container;

        if (!this.changedTime) {
            this.changedTime = true;
            this.updateTime();
        }

        return (
            <div className="edit-div">
                <div class="input-field">
                    <input id="name" type="text" value={wireframe.name} onChange={(e) => this.handleChange(wireframe, e)} class="validate"></input>
                    <label for="name">Name</label>
                </div>
                <div id="edit-modules" class="row">
                    <div class="col s3">
                        <div id="ZoomSaveCancel" class="row">
                            <div id="zoomin" className="clicker black-text col s2" onClick={(e) => this.handleChange(wireframe, e)}><Icon>zoom_in</Icon></div>
                            <div id="zoomout" className="clicker black-text col s2" onClick={(e) => this.handleChange(wireframe, e)}><i class="material-icons">zoom_out</i></div>
                            <div className="clicker black-text col s4">Save</div>
                            <div className="clicker black-text col s4">Cancel</div>
                        </div>
                        <div className="col s12" style={{ height: 70 }}> </div>
                        <div id="ComponentElements" className="row">
                            <div className="col s3" style={{ height: 50 }}> </div>
                            <div className="white btn-large col s6" style={{ borderStyle: "solid", borderColor: "black" }}></div>
                            <div className="col s3" style={{ height: 50 }}> </div>
                            <div className="col s12" style={{ textAlign: "center" }}>Container</div>
                            <div className="col s12" style={{ height: 100 }}> </div>
                            <div className="btn-large-flat col s12" style={{ textAlign: "center" }}>Prompt for Input:</div>
                            <div className="col s12" style={{ height: 10 }}> </div>
                            <div className="col s12" style={{ textAlign: "center" }}>Label</div>
                            <div className="col s12" style={{ height: 100 }}> </div>
                            <div className="col s2" style={{ height: 50 }}> </div>
                            <div className="grey btn col s8" style={{ borderStyle: "solid", borderColor: "grey", textAlign: "left", textTransform: "none", color: "grey" }}>Input</div>
                            <div className="col s2" style={{ height: 50 }}> </div>
                            <div className="col s12" style={{ textAlign: "center" }}>Textfield</div>
                        </div>
                    </div>
                    <div class="grey lighten-2 container col s6" style={{ height: 500, width: 500, overflow: "auto" }}>
                        <Rnd id="JSONcontainer" className="white container" bounds="parent" size={{ width: container.width, height: container.height, }} position={{ x: 0, y: 0 }} style={{ position: "relative", borderRadius: "5px", borderColor: "black", border: "solid" }}>
                            {controls && controls.map((controls) => {
                                if (controls.type === "label") {
                                    console.log(controls.text);
                                    return (<Rnd id="label" onClick={(e) => this.handleChange(wireframe, e)} bounds="parent" size={{ width: controls.width, height: controls.height, }} position={{ x: controls.left, y: controls.top }} className="btn-large-flat" style={{
                                        textAlign: "center",
                                        background: controls.background,
                                        borderColor: controls.bordercolor,
                                        border: "solid",
                                        borderWidth: controls.borderwidth,
                                        borderRadius: controls.borderradius,
                                        fontSize: controls.fontsize,
                                    }}>{controls.text}</Rnd>)
                                }
                            })}
                        </Rnd>
                    </div>
                    <div class="col s3">
                        <div id="PropertiesToolbar" className="row">
                            <div className="col s12">Properties:</div>
                            <div class="input-field col s12">
                                <input id="name" type="text" class="validate"></input>
                                <label for="name">Component</label>
                            </div>
                            <div className="col s12" style={{ height: 20 }}> </div>
                            <div class="col s6">Font Size:</div>
                            <div class="input-field col s6">
                                <input id="font_size" type="number" class="validate"></input>
                            </div>
                            <div className="col s12" style={{ height: 20 }}> </div>
                            <div class="col s6">Font Color:</div>
                            <div class="input-field col s6">
                                <input id="font_size" type="color" class="validate"></input>
                            </div>
                            <div className="col s12" style={{ height: 20 }}> </div>
                            <div class="col s6">Background:</div>
                            <div class="input-field col s6">
                                <input id="font_size" type="color" class="validate"></input>
                            </div>
                            <div className="col s12" style={{ height: 20 }}> </div>
                            <div class="col s6">Border Color:</div>
                            <div class="input-field col s6">
                                <input id="font_size" type="color" class="validate"></input>
                            </div>
                            <div className="col s12" style={{ height: 20 }}> </div>
                            <div class="col s6">Border Thickness:</div>
                            <div class="input-field col s6">
                                <input id="font_size" type="number" class="validate"></input>
                            </div>
                            <div class="col s6">Border Radius:</div>
                            <div class="input-field col s6">
                                <input id="font_size" type="number" class="validate"></input>
                            </div>
                        </div>
                    </div>
                    <div className="col s12" style={{ height: 30 }}> </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { wireframes } = state.firestore.data;
    const wireframe = wireframes ? wireframes[id] : null;
    if (wireframe)
        wireframe.id = id;

    return {
        wireframe,
        auth: state.firebase.auth,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        updateListName: (wireframe, id) => dispatch(updateListName(wireframe, id)),
        zoomInOut: (wireframe, id) => dispatch(zoomInOut(wireframe, id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect([
        { collection: 'wireframes' },
    ]),
)(EditScreen);