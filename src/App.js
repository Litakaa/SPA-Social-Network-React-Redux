import React, {Suspense} from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import Navbar from "./components/Navbar/Navbar";
import store from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import("./components/Diallogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Suspense fallback={<div><Preloader /></div>}>
                            <section>
                                <Routes>
                                    <Route path="/dialogs/" element={<DialogsContainer/>}/>
                                    <Route path="/profile" element={<ProfileContainer/>}>
                                        <Route path=":userId" element={<ProfileContainer/>}/>
                                    </Route>
                                    <Route path="/users" element={<UsersContainer/>}/>
                                    <Route path="/news/*" element={<News/>}/>
                                    <Route path="/music" element={<Music/>}/>
                                    <Route path="/settings" element={<Settings/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                </Routes>
                            </section>
                        </Suspense>
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
const AppContainer =  connect(mapStateToProps, {initializeApp})(App);

const MainApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
export default MainApp;