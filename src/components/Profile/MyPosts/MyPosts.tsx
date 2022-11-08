import * as React from "react";
// @ts-ignore
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import AddPostForm from "./AddPostForm/AddPostForm";
import {PostType} from "../../../types/types";

type PropsType = {
    posts: Array<PostType>
    addPost: (newPostText: string) => void
}

export type NewPostFormType = {
    newPostText: string
}

const MyPosts: React.FC<PropsType> = (props) => {
    let postsElement = [...props.posts]
        .reverse()
        .map((p => <Post message={p.message} key={p.id} likeCounts={p.likeCount}/>));
    let addNewPost = (values: NewPostFormType) => {
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
const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;