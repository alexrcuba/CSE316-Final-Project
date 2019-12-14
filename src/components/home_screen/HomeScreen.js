import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeLinks from './WireframeLinks'
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {
    handleNewWireframe = () => {
        let newWireframeData = {
            name: 'Unknown',
            owner: 'Unknown',
            container: {
                height: 5000,
                width: 5000,
                selected: -1,
                saved: true,
                zoomamount: 0
            },
            controls: [],
            time: Date.now(),
        }
        const fireStore = getFirestore();
        let newWireframe = fireStore.collection("wireframes").doc();
        newWireframe.set(newWireframeData);

        this.props.history.push({
            pathname: "/edit/" + newWireframe.id,
            key: newWireframe.id,
        });
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="z-depth-2" style={{
                backgroundColor: "#aeaeae", paddingBottom: '70px', borderRadius: '0 0 10px 10px'
            }}>
                <div className="dashboard container">
                    <div className="row">
                        <div className="col s12 m4">
                            <WireframeLinks />
                        </div>

                        <div className="col s8">
                            <div className="banner">
                                Wireframe<br />
                                Maker
                        </div>

                            <div style={{ paddingTop: '15px' }} className="home_new_Wireframe_container center-align">
                                <a onClick={this.handleNewWireframe} className="waves-effect waves-light btn-large grey darken-2 hoverable rounded">
                                    <i className="material-icons right">library_add</i>Create a New Wireframe
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'wireframes', orderBy: ["time", "desc"] },
    ]),
)(HomeScreen);