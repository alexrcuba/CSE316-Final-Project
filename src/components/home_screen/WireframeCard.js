import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import {deleteWireframe} from '../../store/actions/actionCreators';

class WireframeCard extends React.Component {
    
    handleChange(e){
        e.stopPropagation();
        e.preventDefault();
        this.props.deleteWireframe(this.props.wireframe.id);
    }

    render() {
        const { wireframe } = this.props;
        console.log("wireframeCard, wireframe.id: " + wireframe.id);
        return (
            <div className="card z-depth-2 rounded grey lighten-4 todo-list-link hoverable">
                <div className="card-content grey-text text-darken-4 item_card">
                    <div className="row">
                        <span className="card-title col s8">{wireframe.name}</span>
                        <a className="delete=project btn-floating btn-large waves-effect waves-light purple lighten-3 col s4" onClick={this.handleChange.bind(this)}><i class="material-icons">delete</i></a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteWireframe: (id) => dispatch(deleteWireframe(id)),
})
export default compose(connect(null, mapDispatchToProps), firestoreConnect([{collection: "wireframes"}]))(WireframeCard);