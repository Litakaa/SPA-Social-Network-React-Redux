import profileReducer, {addPostActionCreator} from "./profile-reducer";


test('length of posts should be incremented', () => {
    let action = addPostActionCreator("Yuliaaaaa1q11");
    let state = {
        posts: [
            {id: 1, message: "It's first post", likeCount: 15},
            {id: 2, message: 'Hello', likeCount: 20},
            {id: 3, message: 'Hi', likeCount: 35},
            {id: 4, message: 'Hi', likeCount: 25}
        ]
    };
    let newState = profileReducer(state,action);
    expect(newState.posts.length).toBe(5);
    expect(newState.posts[4].message).toBe("Yuliaaaaa1q11");
});

