import React from "react";
import './App.css';
import {Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Diallogs/DialogsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if(!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavbarContainer/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                        <Route path="/profile" element={<ProfileContainer/>}>
                            <Route path=":userId" element={<ProfileContainer/>}/>
                        </Route>
                        <Route path="/users" element={<UsersContainer/>}/>
                        <Route path="/news/*" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

export default connect (mapStateToProps, {initializeApp})(App);