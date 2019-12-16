import React from 'react'
import { connect } from 'react-redux';
import todoJson from './TestTodoListData.json'
import { getFirestore } from 'redux-firestore';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class DatabaseTester extends React.Component {

    isAdmin(users, auth) {
        if (users === null) {
            return ""
        }
        const entries = Object.entries(users);
        for (const entry of entries) {
            if (entry[1].email === auth.email) {
                if (entry[1].admin === true) {
                    return true;
                }
            }
        }
        return false;
    }

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframes').get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('wireframes').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        todoJson.wireframes.forEach(todoListJson => {
            fireStore.collection('wireframes').add({
                name: todoListJson.name,
                owner: todoListJson.owner,
                container: todoListJson.container,
                controls: todoListJson.controls,
                time: Date.now()
            }).then(() => {
                console.log("DATABASE RESET");
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    render() {
        if (this.isAdmin(this.props.users, this.props.auth) === true) {
            return (
                <div>
                    <button onClick={this.handleClear}>Clear Database</button>
                    <button onClick={this.handleReset}>Reset Database</button>
                </div>)
        } else{
            return(<div></div>)
        }
    }
}

const mapStateToProps = (state) => {
    const { users } = state.firestore.data;
    return {
        auth: state.firebase.auth,
        users: users ? users : null
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'wireframes', orderBy: ["time", "desc"] },
        { collection: 'users' }
    ]),
)(DatabaseTester);