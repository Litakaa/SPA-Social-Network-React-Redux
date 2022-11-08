import * as React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUsersProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import { RouteComponentProps } from "@reach/router";
import {ProfileType} from "../../types/types";


type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    getUsersProfile: (userId: number)=> void
    getStatus: (userId: number)=> void
    updateStatus: (status: string)=> void
    savePhoto: (file: File)=> void
    saveProfile: (profile: ProfileType)=> Promise<any>
    router: any
}
 type PathParamsType = {
    userId: string
 }
type LocalStateType = { isShowMyProfile: boolean }
type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>


class ProfileContainer extends React.Component<PropsType, LocalStateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            isShowMyProfile: true
        }
    }
    componentDidMount() {
        let userIdFromPath= +this.props.router.params.userId;
        let authorisedUserId = this.props.authorizedUserId
        if (userIdFromPath) {
            this.props.getUsersProfile(userIdFromPath)
            this.props.getStatus(userIdFromPath)

        } else {
            if (this.props.isAuth && authorisedUserId) {
                this.props.getUsersProfile(authorisedUserId)
                this.props.getStatus(authorisedUserId)
            }
        }
    }
    componentDidUpdate(prevProps: PropsType & LocalStateType, prevState: PropsType & LocalStateType) {
        let userIdFromPath = +this.props.router.params.userId
        let authorisedUserId = this.props.authorizedUserId
        let isShowMyProfile = this.state.isShowMyProfile

        if (isShowMyProfile) {

            if (userIdFromPath === authorisedUserId) {
                this.setState({isShowMyProfile: false})
            }

            if (!userIdFromPath && this.props.isAuth && authorisedUserId) {
                this.props.getUsersProfile(authorisedUserId)
                this.props.getStatus(authorisedUserId)
                this.setState({isShowMyProfile: false})
            }
        }
    }

    render() {
        if (!this.props.isAuth && !this.props.router.params.userId) {
            return <Navigate to={'/login'} />
        }

        let userIdFromPath = +this.props.router.params.userId
        let authorisedUserId = this.props.authorizedUserId

        let isOwner = false
        if (!userIdFromPath && this.props.isAuth) {
            isOwner = true
        } else if (userIdFromPath === authorisedUserId) {
            isOwner = true
        }


        return (
            <div>
                <Profile {...this.props}
                        isOwner = {isOwner}
                         profile = {this.props.profile}
                         status = {this.props.status}
                         updateStatus = {this.props.updateStatus}
                         savePhoto = {this.props.savePhoto}
                         saveProfile={this.props.saveProfile}
                />
            </div>
        );
    }
}
const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}
export default compose<React.ComponentType>(
    connect (mapStateToProps,{getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
)(ProfileContainer);

function withRouter(Component: any) {

    function ComponentWithRouterProp(props: any) {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()

        return <Component
            {...props}
            router={{location, navigate, params}}/>
    }

    return ComponentWithRouterProp
}