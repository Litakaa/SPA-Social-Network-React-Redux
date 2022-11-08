import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: "It's first post", likeCount: 15},
        {id: 2, message: 'Hello', likeCount: 20},
        {id: 3, message: 'Hi', likeCount: 35},
        {id: 4, message: 'Hi', likeCount: 25}
    ]
};

test('length of posts should be incremented', () => {
    let action = addPostActionCreator("Yuliaaaaa1q11");
    let newState = profileReducer(state,action);
    expect(newState.posts.length).toBe(5);
});

test('message of new posts should be correct', () => {
    let action = addPostActionCreator("Yuliaaaaa1q11");
    let newState = profileReducer(state,action);
    expect(newState.posts[4].message).toBe("Yuliaaaaa1q11");
});

test('after deleting length of messages should be decrement', () => {
    let action = deletePost(1);
    let newState = profileReducer(state,action);
    expect(newState.posts.length).toBe(3);
});

test('after deleting length should`t be decrement if id is incorrect', () => {
    let action = deletePost(1000);
    let newState = profileReducer(state,action);
    expect(newState.posts.length).toBe(4);
});