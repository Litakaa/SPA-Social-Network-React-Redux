import profileReducer, {actions} from "./profile-reducer"
import {PostType, ProfileType} from "../types/types";

let state = {
    posts: [
        {id: 1, message: "It's first post", likeCount: 15},
        {id: 2, message: 'Hello', likeCount: 20},
        {id: 3, message: 'Hi', likeCount: 35},
        {id: 4, message: 'Hi', likeCount: 25}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ""
};

test('length of posts should be incremented', () => {
    let action = actions.addPostActionCreator("Yuliaaaaa1q11");
    let newState = profileReducer(state,action);
    expect(newState.posts.length).toBe(5);
});

test('message of new posts should be correct', () => {
    let action = actions.addPostActionCreator("Yuliaaaaa1q11");
    let newState = profileReducer(state,action);
    expect(newState.posts[4].message).toBe("Yuliaaaaa1q11");
});

test('after deleting length of messages should be decrement', () => {
    let action = actions.deletePost(1);
    let newState = profileReducer(state,action);
    expect(newState.posts.length).toBe(3);
});

test('after deleting length should`t be decrement if id is incorrect', () => {
    let action = actions.deletePost(1000);
    let newState = profileReducer(state,action);
    expect(newState.posts.length).toBe(4);
});