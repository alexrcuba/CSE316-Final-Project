import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Button, Modal, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import { Rnd } from 'react-rnd';
import { updateWireframe, updateListName, zoomInOut } from '../../store/actions/actionCreators.js';

class EditScreen extends Component {
    state = {
        editedComponent: {
            key: "",
            text: "",
            fontsize: "",
            fontcolor: "",
            background: "",
            bordercolor: "",
            borderwidth: "",
            borderradius: "",
            height: "",
            width: "",
            top: "",
            left: ""
        },
        cancelOption: {
            init: false,
            saved: true,
            originalWireframe: ""
        }
    }

    deselectControl = (e) => {
        this.setState({
            editedComponent: {
                key: "",
                text: "",
                fontsize: "",
                fontcolor: "",
                background: "",
                bordercolor: "",
                borderwidth: "",
                borderradius: "",
                height: "",
                width: "",
                top: "",
                left: ""
            }
        })
    }

    selectControl = (wireframe, e) => {
        e.preventDefault();
        e.stopPropagation();
        const { target } = e;
        const key = target.id;
        const item = wireframe.controls[key]
        if (item === undefined) {
            return;
        }
        this.setState({
            editedComponent: {
                key: item.key,
                text: item.text,
                fontsize: item.fontsize,
                fontcolor: item.fontcolor,
                background: item.background,
                bordercolor: item.bordercolor,
                borderwidth: item.borderwidth,
                borderradius: item.borderradius,
                height: item.height,
                width: item.width,
                top: item.top,
                left: item.left
            }
        })
    }

    isVisible(e) {
        if (this.state.editedComponent.key === e) {
            return ""
        } else {
            return "hidden";
        }
    }

    onResize = (wireframe, key, e, direction, ref, delta, position) => {
        if (this.state.cancelOption.init === false) {
            let copy = JSON.parse(JSON.stringify(wireframe));
            this.setState({
                cancelOption: {
                    init: true,
                    saved: false,
                    originalWireframe: copy
                }

            })
        } else{
            let noSaved = this.state.cancelOption;
            noSaved.saved = false;
            this.setState({
                cancelOption: noSaved
            })
        }
        wireframe.controls[key].width = ref.offsetWidth;
        wireframe.controls[key].height = ref.offsetHeight;
        wireframe.controls[key].top = position.y;
        wireframe.controls[key].left = position.x;
        this.props.updateWireframe(wireframe, wireframe.id);
    }

    onDrag = (wireframe, key, e, d) => {
        if (this.state.cancelOption.init === false) {
            let copy = JSON.parse(JSON.stringify(wireframe));
            this.setState({
                cancelOption: {
                    init: true,
                    saved: false,
                    originalWireframe: copy
                }

            })
        } else{
            let noSaved = this.state.cancelOption;
            noSaved.saved = false;
            this.setState({
                cancelOption: noSaved
            })
        }
        wireframe.controls[key].top = d.y;
        wireframe.controls[key].left = d.x;
        this.props.updateWireframe(wireframe, wireframe.id);
    }

    handleChange = (wireframe, e) => {
        const { target } = e;
        if (target.id !== "noaved") {
            let noSaved = this.state.cancelOption;
            noSaved.saved = false;
            this.setState({
                cancelOption: noSaved
            })
        }
        if (this.state.cancelOption.init === false) {
            let copy = JSON.parse(JSON.stringify(wireframe));
            this.setState({
                cancelOption: {
                    init: true,
                    saved: false,
                    originalWireframe: copy
                }

            })
        }
        if (target.id === "name") {
            this.props.updateListName(target.value, wireframe.id);
        } else if (target.id === "height") {
            if (target.value >= 0 && target.value <= 5000) {
                wireframe.container.height = parseInt(target.value, 10);
                this.props.updateWireframe(wireframe, wireframe.id);
            }
        } else if (target.id === "width") {
            if (target.value >= 0 && target.value <= 5000) {
                wireframe.container.width = parseInt(target.value, 10);
                this.props.updateWireframe(wireframe, wireframe.id);
            }
        } else if (target.id === "save") {
            let isSaved = this.state.cancelOption;
            isSaved.saved = true;
            this.setState({
                cancelOption: isSaved
            })
            if (wireframe.container.zoomamount > 0) {
                wireframe.container.height /= (Math.pow(2, wireframe.container.zoomamount));
                wireframe.container.width /= (Math.pow(2, wireframe.container.zoomamount));
                let controls = wireframe.controls;
                controls && controls.forEach((controls) => {
                    controls.fontsize /= (Math.pow(2, wireframe.container.zoomamount));
                    controls.borderwidth /= (Math.pow(2, wireframe.container.zoomamount));
                    controls.borderRadius /= (Math.pow(2, wireframe.container.zoomamount));
                    controls.height /= (Math.pow(2, wireframe.container.zoomamount));
                    controls.width /= (Math.pow(2, wireframe.container.zoomamount));
                    controls.top /= (Math.pow(2, wireframe.container.zoomamount));
                    controls.left /= (Math.pow(2, wireframe.container.zoomamount));
                });
                wireframe.controls = controls;
                wireframe.container.zoomamount = 0;
            } else if (wireframe.container.zoomamount < 0) {
                wireframe.container.height /= (Math.pow(2, wireframe.container.zoomamount));
                wireframe.container.width /= (Math.pow(2, wireframe.container.zoomamount));
                let controls = wireframe.controls;
                controls && controls.forEach((controls) => {
                    controls.fontsize /= (Math.pow(2, wireframe.container.zoomamount));
                    controls.borderwidth /= (Math.pow(2, wireframe.container.zoomamount));
                    controls.borderRadius /= (Math.pow(2, wireframe.container.zoomamount));
                    controls.height /= (Math.pow(2, wireframe.container.zoomamount));
                    controls.width /= (Math.pow(2, wireframe.container.zoomamount));
                    controls.top /= (Math.pow(2, wireframe.container.zoomamount));
                    controls.left /= (Math.pow(2, wireframe.container.zoomamount));
                });
                wireframe.controls = controls;
                wireframe.container.zoomamount = 0;
            }
            this.props.updateWireframe(wireframe, wireframe.id);
        } else if (target.id === "nosave") {
            this.props.updateWireframe(this.state.cancelOption.originalWireframe, wireframe.id);
        } else if (target.id === "component") {
            let newItem = this.state.editedComponent;
            newItem.text = target.value;
            this.setState({
                editedComponent: newItem
            })
            wireframe.controls[this.state.editedComponent.key] = this.state.editedComponent;
            this.props.updateWireframe(wireframe, wireframe.id);
        } else if (target.id === "font_size") {
            if (target.value >= 0) {
                let newItem = this.state.editedComponent;
                newItem.fontsize = parseInt(target.value, 10);
                this.setState({
                    editedComponent: newItem
                })
                wireframe.controls[this.state.editedComponent.key] = this.state.editedComponent;
                this.props.updateWireframe(wireframe, wireframe.id);
            }
        } else if (target.id === "font_color") {
            let newItem = this.state.editedComponent;
            newItem.fontcolor = target.value;
            this.setState({
                editedComponent: newItem
            })
            wireframe.controls[this.state.editedComponent.key] = this.state.editedComponent;
            this.props.updateWireframe(wireframe, wireframe.id);
        } else if (target.id === "background") {
            let newItem = this.state.editedComponent;
            newItem.background = target.value;
            this.setState({
                editedComponent: newItem
            })
            wireframe.controls[this.state.editedComponent.key] = this.state.editedComponent;
            this.props.updateWireframe(wireframe, wireframe.id);
        } else if (target.id === "border_c") {
            let newItem = this.state.editedComponent;
            newItem.bordercolor = target.value;
            this.setState({
                editedComponent: newItem
            })
            wireframe.controls[this.state.editedComponent.key] = this.state.editedComponent;
            this.props.updateWireframe(wireframe, wireframe.id);
        } else if (target.id === "border_t") {
            if (target.value >= 0) {
                let newItem = this.state.editedComponent;
                newItem.borderwidth = parseInt(target.value, 10);
                this.setState({
                    editedComponent: newItem
                })
                wireframe.controls[this.state.editedComponent.key] = this.state.editedComponent;
                this.props.updateWireframe(wireframe, wireframe.id);
            }
        } else if (target.id === "border_r") {
            if (target.value >= 0) {
                let newItem = this.state.editedComponent;
                newItem.borderradius = parseInt(target.value, 10);
                this.setState({
                    editedComponent: newItem
                })
                wireframe.controls[this.state.editedComponent.key] = this.state.editedComponent;
                this.props.updateWireframe(wireframe, wireframe.id);
            }
        } else if (target.firstChild != null) {
            if (target.firstChild.data === "zoom_in") {
                wireframe.container.zoomamount += 1;
                wireframe.container.height *= 2;
                wireframe.container.width *= 2;
                if (wireframe.container.height > 5000 || wireframe.container.width > 5000) {
                    wireframe.container.zoomamount -= 1;
                    wireframe.container.height /= 2;
                    wireframe.container.width /= 2;
                    return;
                }
                let controls = wireframe.controls;
                controls && controls.forEach((controls) => {
                    controls.fontsize *= 2;
                    controls.borderwidth *= 2;
                    controls.borderradius *= 2;
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
        let fireStore = getFirestore();
        fireStore.collection('wireframes').doc(this.props.wireframe.id).update({ time: Date.now() })
    }

    createControl = (wireframe, e) => {
        const { target } = e;
        if (target.id !== "noaved") {
            let noSaved = this.state.cancelOption;
            noSaved.saved = false;
            this.setState({
                cancelOption: noSaved
            })
        }
        if (this.state.cancelOption.init === false) {
            let copy = JSON.parse(JSON.stringify(wireframe));
            this.setState({
                cancelOption: {
                    init: true,
                    saved: false,
                    originalWireframe: copy
                }

            })
        }
        let control = null;
        if (target.id === "container") {
            control = {
                key: 0,
                text: "",
                fontsize: 0,
                background: "#ffffff",
                fontcolor: "#ffffff",
                bordercolor: "#000000",
                borderwidth: 3,
                borderradius: 2,
                height: 60,
                width: 150,
                top: 0,
                left: 0
            }
        } else if (target.id === "label") {
            control = {
                key: 0,
                text: "Prompt for Input:",
                fontsize: 15,
                background: "#ffffff",
                fontcolor: "#000000",
                bordercolor: "#ffffff",
                borderwidth: 0,
                borderradius: 0,
                height: 30,
                width: 220,
                top: 0,
                left: 0
            }
        } else if (target.id === "textfield") {
            control = {
                key: 0,
                text: "Input",
                fontsize: 15,
                background: "#9e9e9e",
                fontcolor: "#757575",
                bordercolor: "#757575",
                borderwidth: 3,
                borderradius: 2,
                height: 35,
                width: 200,
                top: 0,
                left: 0
            }
        }
        control.key = wireframe.controls.length;
        wireframe.controls.push(control);
        this.props.updateWireframe(wireframe, wireframe.id);
    }

    render() {
        const auth = this.props.auth;
        let wireframe = this.props.wireframe;

        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if (!wireframe)
            return <React.Fragment />

        let controls = wireframe.controls;
        let container = wireframe.container;
        const ConditionalLink = ({ children, to, condition }) => (!!condition && to) ? <Link to={to}>{children}</Link> : <>{children}</>;
        const ConditionalModal = ({ children, condition }) => (!!condition) ? <Modal header="Changes Not Saved!" trigger={<div className="clicker black-text col s4" onClick={(e) => this.handleChange(wireframe, e)}>Close</div>}
            actions={<div><Link to="/"><Button id="save" className="grey darken-1 waves-effect waves-light btn modal-action modal-close" onClick={(e) => this.handleChange(wireframe, e)}>Save Changes</Button></Link>
                <Link to="/"><Button id="nosave" className="grey darken-1 waves-effect waves-light btn modal-action modal-close" onClick={(e) => this.handleChange(wireframe, e)}>Continue Without Saving</Button></Link></div>}>
            <h5>You are about to quit without saving your changes. Are you sure you want to do this?</h5>
        </Modal> : <>{children}</>;

        if (!this.changedTime) {
            this.changedTime = true;
            this.updateTime();
        }

        return (
            <div className="edit-div">
                <div id="input-field" className="row">
                    <div className="col s1">Name:</div>
                    <div className="input-field col s3">
                        <input id="name" type="text" value={wireframe.name} onChange={(e) => this.handleChange(wireframe, e)} className="validate"></input>
                    </div>
                    <div className="col s2">Dimensions:</div>
                    <div className="input-field col s3">
                        <input id="height" type="number" value={wireframe.container.height} onChange={(e) => this.handleChange(wireframe, e)} className="validate"></input>
                        <label htmlFor="height">Height</label>
                    </div>
                    <div className="input-field col s3">
                        <input id="width" type="number" value={wireframe.container.width} onChange={(e) => this.handleChange(wireframe, e)} className="validate"></input>
                        <label htmlFor="width">Width</label>
                    </div>
                </div>
                <div id="edit-modules" className="row">
                    <div className="col s3">
                        <div id="ZoomSaveCancel" className="row">
                            <div id="zoomin" className="clicker black-text col s2" onClick={(e) => this.handleChange(wireframe, e)}><Icon>zoom_in</Icon></div>
                            <div id="zoomout" className="clicker black-text col s2" onClick={(e) => this.handleChange(wireframe, e)}><i className="material-icons">zoom_out</i></div>
                            <div id="save" onClick={(e) => this.handleChange(wireframe, e)} className="clicker black-text col s4">Save</div>
                            <ConditionalLink id="close" to="/" condition={!this.state.cancelOption.init || (this.state.cancelOption.init && this.state.cancelOption.saved)}><ConditionalModal id="closeModal" condition={!this.state.cancelOption.saved}><div className="clicker black-text col s4">Close</div></ConditionalModal></ConditionalLink>
                        </div>
                        <div className="col s12" style={{ height: 70 }}> </div>
                        <div id="ComponentElements" className="row">
                            <div className="col s3" style={{ height: 50 }}> </div>
                            <div id="container" className="white btn-large col s6" style={{ borderStyle: "solid", borderColor: "black" }} onClick={(e) => this.createControl(wireframe, e)}></div>
                            <div className="col s3" style={{ height: 50 }}> </div>
                            <div className="col s12" style={{ textAlign: "center" }}>Container</div>
                            <div className="col s12" style={{ height: 100 }}> </div>
                            <div id="label" className="btn-large-flat col s12" style={{ textAlign: "center" }} onClick={(e) => this.createControl(wireframe, e)}>Prompt for Input:</div>
                            <div className="col s12" style={{ height: 10 }}> </div>
                            <div className="col s12" style={{ textAlign: "center" }}>Label</div>
                            <div className="col s12" style={{ height: 100 }}> </div>
                            <div className="col s2" style={{ height: 50 }}> </div>
                            <div id="textfield" className="grey btn col s8" style={{ borderStyle: "solid", borderColor: "grey", textAlign: "center", textTransform: "none", color: "grey" }} onClick={(e) => this.createControl(wireframe, e)}>Input</div>
                            <div className="col s2" style={{ height: 50 }}> </div>
                            <div className="col s12" style={{ textAlign: "center" }}>Textfield</div>
                        </div>
                    </div>
                    <div className="grey lighten-2 container col s6" onClick={(e) => this.deselectControl(wireframe, e)} style={{ height: 500, width: 500, overflow: "auto" }}>
                        <div id="JSONcontainer" className="white container" onClick={(e) => this.deselectControl(wireframe, e)} style={{ width: container.width, height: container.height, position: "relative", borderRadius: "3px", borderColor: "black", border: "solid", borderWidth: "2px" }}>
                            {controls && controls.map((controls) => {
                                return (<Rnd id={controls.key} onClick={(e) => this.selectControl(wireframe, e)} bounds="parent" size={{ width: controls.width, height: controls.height, }} position={{ x: controls.left, y: controls.top }} className="btn-large-flat" onResizeStop={(...args) => this.onResize(wireframe, controls.key, ...args)} onDragStop={(...args) => this.onDrag(wireframe, controls.key, ...args)} style={{
                                    textAlign: "center",
                                    background: controls.background,
                                    border: "solid",
                                    color: controls.fontcolor,
                                    borderWidth: controls.borderwidth,
                                    borderColor: controls.bordercolor,
                                    borderRadius: controls.borderradius,
                                    fontSize: controls.fontsize
                                }}>{controls.text}<div id={"visible" + controls.key} style={{ visibility: this.isVisible(controls.key) }}><div className="red container" style={{ top: 0, left: 0, height: 20, width: 20, position: "absolute", zIndex: 1 }}></div>
                                        <div className="red container" style={{ top: 0, right: 0, height: 20, width: 20, position: "absolute", zIndex: 1 }}></div>
                                        <div className="red container" style={{ bottom: 0, left: 0, height: 20, width: 20, position: "absolute", zIndex: 1 }}></div>
                                        <div className="red container" style={{ bottom: 0, right: 0, height: 20, width: 20, position: "absolute", zIndex: 1 }}></div></div></Rnd>)
                            })}
                        </div>
                    </div>
                    <div className="col s3">
                        <div id="PropertiesToolbar" className="row">
                            <div className="col s12">Properties:</div>
                            <div className="input-field col s12">
                                <input id="component" type="text" onChange={(e) => this.handleChange(wireframe, e)} value={this.state.editedComponent.text} className="validate"></input>
                                <label htmlFor="component">Component</label>
                            </div>
                            <div className="col s12" style={{ height: 20 }}> </div>
                            <div className="col s6">Font Size:</div>
                            <div className="input-field col s6">
                                <input id="font_size" type="number" onChange={(e) => this.handleChange(wireframe, e)} value={this.state.editedComponent.fontsize} className="validate"></input>
                            </div>
                            <div className="col s12" style={{ height: 20 }}> </div>
                            <div className="col s6">Font Color:</div>
                            <div className="input-field col s6">
                                <input id="font_color" type="color" onChange={(e) => this.handleChange(wireframe, e)} value={this.state.editedComponent.fontcolor} className="validate"></input>
                            </div>
                            <div className="col s12" style={{ height: 20 }}> </div>
                            <div className="col s6">Background:</div>
                            <div className="input-field col s6">
                                <input id="background" type="color" onChange={(e) => this.handleChange(wireframe, e)} value={this.state.editedComponent.background} className="validate"></input>
                            </div>
                            <div className="col s12" style={{ height: 20 }}> </div>
                            <div className="col s6">Border Color:</div>
                            <div className="input-field col s6">
                                <input id="border_c" type="color" onChange={(e) => this.handleChange(wireframe, e)} value={this.state.editedComponent.bordercolor} className="validate"></input>
                            </div>
                            <div className="col s12" style={{ height: 20 }}> </div>
                            <div className="col s6">Border Thickness:</div>
                            <div className="input-field col s6">
                                <input id="border_t" type="number" onChange={(e) => this.handleChange(wireframe, e)} value={this.state.editedComponent.borderwidth} className="validate"></input>
                            </div>
                            <div className="col s6">Border Radius:</div>
                            <div className="input-field col s6">
                                <input id="border_r" type="number" onChange={(e) => this.handleChange(wireframe, e)} value={this.state.editedComponent.borderradius} className="validate"></input>
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
        zoomInOut: (wireframe, id) => dispatch(zoomInOut(wireframe, id)),
        updateWireframe: (wireframe, id) => dispatch(updateWireframe(wireframe, id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect([
        { collection: 'wireframes' },
    ]),
)(EditScreen);