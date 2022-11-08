import * as React from "react";
import {actions} from "../../../redux/profile-reducer";
import MyPosts, {MapDispatchPropsType, MapStatePropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    }
}

const MyPostContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
(mapStateToProps,{addPost:actions.addPost})(MyPosts);

export default MyPostContainer;