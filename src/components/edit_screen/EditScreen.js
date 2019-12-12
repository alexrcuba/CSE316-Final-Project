import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button } from 'react-materialize';
import ZoomSaveCancel from './ZoomSaveCancel';
import ComponentElements from './ComponentElements';
import PropertiesToolbar from './PropertiesToolbar';

class EditScreen extends Component {
    state = {
        name: '',
        owner: '',
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
        }

        if (!wireframe)
            return <React.Fragment />

        if (!this.changedTime) {
            this.changedTime = true;
            this.updateTime();
        }

        return (
            <div className="edit-div">
                <div class="input-field">
                    <input id="name" type="text" class="validate"></input>
                    <label for="name">Name</label>
                </div>
                <div class="row">
                <div class="col s3">
                    <ZoomSaveCancel ></ZoomSaveCancel>
                    <div className="col s12" style={{height: 70}}> </div>
                    <ComponentElements></ComponentElements>
                </div>
                <div class="grey lighten-2 container col s6" style={{height: 500}}></div>
                <div class="col s3">
                    <PropertiesToolbar></PropertiesToolbar>
                </div>
                <div className="col s12" style={{height: 30}}> </div>
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

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'wireframes' },
    ]),
)(EditScreen);