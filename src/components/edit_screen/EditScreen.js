import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button } from 'react-materialize';

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
            <div>
                <div class="input-field">
                    <input id="first_name" type="text" class="validate"></input>
                    <label for="first_name">Name</label>
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