// THIS FILE KNOWS HOW TO MAKE ALL THE ACTION
// OBJECDTS THAT WE WILL USE. ACTIONS ARE SIMPLE
// LITTLE PACKAGES THAT REPRESENT SOME EVENT
// THAT WILL BE DISPATCHED TO THE STORE, WHICH
// WILL TRIGGER THE EXECUTION OF A CORRESPONDING
// REDUCER, WHICH ADVANCES STATE

// THESE ARE ALL THE TYPE OF ACTIONS WE'LL BE CREATING
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// THESE CREATORS MAKE ACTIONS ASSOCIATED WITH USER ACCOUNTS

export function registerSuccess() {
    return { type: 'REGISTER_SUCCESS' }
};
export function registerError(error) { 
    return { type: 'REGISTER_ERROR', error }
};
export function loginSuccess() {
    return { type: 'LOGIN_SUCCESS' }
};
export function loginError(error) {
    return { type: 'LOGIN_ERROR', error }
};
export function logoutSuccess() {
    return { type: 'LOGOUT_SUCCESS' }
};

// THESE CREATORS MAKE ACTIONS FOR ASYNCHRONOUS TODO LIST UPDATES
export function createTodoList(todoList) {
    return {
        type: 'CREATE_TODO_LIST',
        todoList
    }
}
export function createTodoListError(error) {
    return {
        type: 'CREATE_TODO_LIST_ERROR',
        error
    }
}
export function deleteWireframe(id) {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const fireStore = getFirestore();
        fireStore.collection('wireframes').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                if(doc.id === id){
                    console.log("deleting " + doc.id);
                    fireStore.collection('wireframes').doc(doc.id).delete();
                }
            })
        });
    }
}
export function updateListName(name, id) {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore()
        firestore.collection("wireframes").doc(id).update({
            name: name
        }).then(() => {
            dispatch({type: 'UPDATE_LIST_NAME', name})
        }).catch((err) => {
            dispatch({
                type: 'UPDATE_LIST_NAME_ERROR', err})
        })
        }
}
export function zoomInOut(wireframe, id) {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore()
        firestore.collection("wireframes").doc(id).update({
            container: wireframe.container,
            controls: wireframe.controls

        }).then(() => {
            dispatch({type: 'ZOOMING', wireframe})
        }).catch((err) => {
            dispatch({
                type: 'ZOOMING_ERROR', err})
        })
        }
}
export function updateWireframe(wireframe, id) {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore()
        firestore.collection("wireframes").doc(id).update({
            name: wireframe.name,
            container: wireframe.container,
            controls: wireframe.controls

        }).then(() => {
            dispatch({type: 'ZOOMING', wireframe})
        }).catch((err) => {
            dispatch({
                type: 'ZOOMING_ERROR', err})
        })
        }
}