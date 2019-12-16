import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeLinks from './WireframeLinks'
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {
    handleNewWireframe = (e, auth) => {
        let newWireframeData = {
            name: 'Unknown',
            owner: 'Unknown',
            container: {
                height: 0,
                width: 0,
                zoomamount: 0
            },
            controls: [],
            time: Date.now(),
        }
        newWireframeData.owner = auth.email;
        const fireStore = getFirestore();
        let newWireframe = fireStore.collection("wireframes").doc();
        newWireframe.set(newWireframeData);

        this.props.history.push({
            pathname: "/edit/" + newWireframe.id,
            key: newWireframe.id,
        });
    }

    isAdmin(users, auth){
        if(users === null){
            return ""
        }
        const entries = Object.entries(users);
        for(const entry of entries){
            if(entry[1].email === auth.email){
                if(entry[1].admin === true){
                    return ""
                }
            }
        }
        return "hidden";
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
                                <div onClick={(e) => this.handleNewWireframe(e, this.props.auth)} className="waves-effect waves-light btn-large grey darken-2 hoverable rounded">
                                    <i className="material-icons right">library_add</i>Create a New Wireframe
                                </div>
                            </div>

                            <div style={{ paddingTop: '15px', visibility: this.isAdmin(this.props.users, this.props.auth) }} className="home_new_Wireframe_container center-align">
                                <Link to="/databaseTester">
                                <div className="waves-effect waves-light btn-large grey darken-2 hoverable rounded">
                                    Database Tester
                                </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {users} = state.firestore.data;
    return {
        auth: state.firebase.auth,
        users: users ? users : null
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'wireframes', orderBy: ["time", "desc"] },
        { collection: 'users'}
    ]),
)(HomeScreen);