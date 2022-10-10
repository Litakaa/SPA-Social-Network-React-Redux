import React from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import AddPostForm from "./AddPostForm/AddPostForm";


const MyPosts = (props) => {
    let postsElement = props.posts.map((p => <Post message={p.message} key={p.id} likeCounts={p.likeCount}/>));
    let addNewPost = (values) => {
        props.addPost(values.newPostText);
    }
    return (
        <div className={classes.postBlock}>
            <h3> My Post </h3>
            <AddPostForm onSubmit={addNewPost}/>
            <div className={classes.posts}>
                {postsElement}
            </div>
        </div>
    );
}

export default MyPosts;