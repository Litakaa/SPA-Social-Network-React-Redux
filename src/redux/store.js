import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import saitbarReducer from "./saitbar-reducer";



let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "It's first post", likeCount: 15},
                {id: 2, message: 'Hello', likeCount: 20},
                {id: 3, message: 'Hi', likeCount: 35},
                {id: 4, message: 'Hi', likeCount: 25}
            ],
            newPostText: "Yulia",
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Viktoria'},
                {id: 2, name: 'Den'},
                {id: 3, name: 'Andrey'},
                {id: 4, name: 'Yulia'},
                {id: 5, name: 'Maik'}
            ],
            messages: [
                {id: 1, message: 'Hi, how are you?'},
                {id: 2, message: 'How is the weather today?'},
                {id: 3, message: 'How are you feeling?'},
                {id: 4, message: 'Hi'},
                {id: 5, message: 'Hi'},
            ],
            newMessageBody: ""
        },
        saitBarPage: {
            saitBar: [
                {id: 1, name: "Andrey"},
                {id: 2, name: "Sveta"},
                {id: 3, name: "Yulia"}
            ],
            newMessageSaitBar: ""
        },

    },
    _callSubscriber()  {
        console.log("state changed");
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage,action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage,action);
        this._state.saitBarPage = saitbarReducer(this._state.saitBarPage,action);
        this._callSubscriber(this._state);
    }
}

export default store;

window.state = store;