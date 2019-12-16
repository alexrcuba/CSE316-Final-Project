import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';

class WireframeLinks extends React.Component {
    render() {
        const wireframes = this.props.wireframes;
        const auth = this.props.auth;
        return (
            <div className="todo-lists section">
                {wireframes && wireframes.map((wireframe) => {
                    if (wireframe.owner === auth.email) {
                        return (<Link to={'/edit/' + wireframe.id} key={wireframe.id}>
                            <WireframeCard wireframe={wireframe} />
                        </Link>)
                    } else{
                        return null;
                    }
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firestore.ordered.wireframes,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireframeLinks);